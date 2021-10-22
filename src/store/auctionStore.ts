import { ethers } from "ethers";
import create from "zustand";
import { ERC20__factory } from "../assets/typechain/stake";
import immerMiddleware from "./immerMiddleware";
import { makeTxn, Txn, TxnType } from "./tokenStore";
import useWalletStore from "./walletStore";
import ContractAddresses from "../constants/contracts";
import { Auction__factory } from "../assets/typechain/nft";

export type AuctionStore = {
  pendingTx: Txn | null;
  hasAllowance: boolean;
  nftAddress?: string;
  startDate?: Date;
  endDate?: Date;
  lastPrice?: ethers.BigNumber;
  lastBidderAddress?: string;
  steakBalance?: ethers.BigNumber;
  isLastBidUserBid?: boolean;
  hasAuctionStarted?: boolean;
  hasAuctionEnded?: boolean;
  hasAuctionBeenClaimed?: boolean;
  fetchInfo: (
    provider: ethers.providers.Web3Provider,
    userAddress: string,
    retry?: number
  ) => Promise<void>;
  approveSteak: (provider: ethers.providers.Web3Provider) => Promise<void>;
  bid: (
    amount: string,
    provider: ethers.providers.Web3Provider
  ) => Promise<void>;
  claim: (provider: ethers.providers.Web3Provider) => Promise<void>;
};

const useAuctionStore = create<AuctionStore>(
  immerMiddleware((set, get) => ({
    pendingTx: null,
    hasAllowance: false,
    fetchInfo: async (provider, address, retry) => {
      const auctionAddress = ContractAddresses.polygonMainnet.auction;
      const steakAddress = ContractAddresses.polygonMainnet.teak;
      if (!auctionAddress) return;

      const auction = Auction__factory.connect(auctionAddress, provider);
      const order = await auction.orderById(1);
      const endTimestamp = (await auction.endTimestampOf(1)).toNumber();
      const startTimestamp = order.startTimestamp.toNumber();
      const startDate = new Date(startTimestamp * 1000);
      console.log(startDate);
      const endDate = new Date(endTimestamp * 1000);
      const lastPrice = order.lastBidPrice;
      const lastBidderAddress = order.lastBidder;
      const hasAuctionStarted = new Date().getTime() > startDate.getTime();
      const hasAuctionEnded = new Date().getTime() > endDate.getTime();
      const hasAuctionBeenClaimed = order.hasBeenClaimed;
      const nftAddress = order.token;
      const steak = ERC20__factory.connect(steakAddress, provider);
      const steakBalance = await steak.balanceOf(address);
      const allowance = await steak.allowance(address, auctionAddress);

      set((state) => {
        state.nftAddress = nftAddress === "" ? undefined : nftAddress;
        state.startDate = startDate;
        state.endDate = endDate;
        state.lastPrice = lastPrice;
        state.lastBidderAddress =
          lastBidderAddress === "" ? undefined : lastBidderAddress;
        state.steakBalance = steakBalance;
        state.hasAllowance = allowance.gt(0);
        state.isLastBidUserBid = lastBidderAddress === address;
        state.hasAuctionStarted = hasAuctionStarted;
        state.hasAuctionEnded = hasAuctionEnded;
        state.hasAuctionBeenClaimed = hasAuctionBeenClaimed;
      });
    },
    approveSteak: async (provider) => {
      const auctionAddress = ContractAddresses.polygonMainnet.auction;

      if (!auctionAddress) {
        return;
      }

      const steak = ERC20__factory.connect(
        ContractAddresses.polygonMainnet.teak,
        provider.getSigner()
      );

      try {
        const transaction = await steak.approve(
          auctionAddress,
          ethers.constants.MaxUint256
        );

        set((state) => {
          state.pendingTx = makeTxn(
            TxnType.approval,
            transaction.hash,
            useWalletStore.getState().requiredNetwork
          );
        });

        await transaction.wait();

        set((state) => {
          state.pendingTx = null;
          state.hasAllowance = true;
        });
      } catch (error) {
        set((state) => {
          state.pendingTx = null;
        });
        console.log(error);
      }
    },
    bid: async (amount, provider) => {
      const auctionAddress = ContractAddresses.polygonMainnet.auction;
      if (!auctionAddress) return;

      const auction = Auction__factory.connect(
        auctionAddress,
        provider.getSigner()
      );
      let parsedAmount = ethers.utils.parseUnits(amount);
      const transaction = await auction.bid(1, parsedAmount);

      set((state) => {
        state.pendingTx = makeTxn(
          TxnType.newBid,
          transaction.hash,
          useWalletStore.getState().requiredNetwork
        );
      });

      const receipt = await transaction.wait();

      set((state) => {
        state.pendingTx = null;
      });

      get().fetchInfo(provider, receipt.from);
    },
    claim: async (provider) => {
      const auctionAddress = ContractAddresses.polygonMainnet.auction;
      if (!auctionAddress) return;

      const auction = Auction__factory.connect(
        auctionAddress,
        provider.getSigner()
      );

      const transaction = await auction.claim(1);

      set((state) => {
        state.pendingTx = makeTxn(
          TxnType.claim,
          transaction.hash,
          useWalletStore.getState().requiredNetwork
        );
      });

      const receipt = await transaction.wait();

      set((state) => {
        state.pendingTx = null;
      });

      get().fetchInfo(provider, receipt.from);
    },
  }))
);

export default useAuctionStore;
