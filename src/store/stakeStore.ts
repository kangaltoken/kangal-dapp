import { BigNumber, ethers } from "ethers";
import create from "zustand";
import immerMiddleware from "./immerMiddleware";

import { ERC20__factory } from "../assets/typechain/factories/ERC20__factory";
import { StakingContract__factory } from "../assets/typechain/factories/StakingContract__factory";

import ContractAddresses from "../constants/contracts";
import useWalletStore, { Network } from "./walletStore";

const pancakePairAbi = [
  "function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)",
];

export enum TxType {
  approval = "APPROVAL",
  deposit = "DEPOSIT",
  withdraw = "WITHDRAW",
  rewardClaim = "REWARD CLAIM",
}

export type Tx = {
  type: TxType;
  hash: string;
  networkExplorerName: string;
  networkExplorerUrl: string;
};

type TokenInfo = {
  address: string;
  userBalance: BigNumber | null;
  totalSupply: BigNumber | null;
  priceUsd: BigNumber | null;
};

type PoolInfo = {
  address: string;
  hasAllowance: boolean | null;
  firstDepositTimestamp: BigNumber | null;
  timeLimitPassed: boolean | null;
  totalStakedBalance: BigNumber | null;
  stakedBalance: BigNumber | null;
  pendingEarnings: BigNumber | null;
  totalLockedValue: number | null;
};

export type StakeStore = {
  pendingTx: Tx | null;
  kangalInfo: TokenInfo;
  steakInfo: TokenInfo;
  poolInfo: PoolInfo;
  kangalPairAddress: string;
  stablePairAddress: string;
  fetchInfo: (
    provider: ethers.providers.Web3Provider,
    userAddress: string
  ) => Promise<void>;
  approve: (provider: ethers.providers.Web3Provider) => Promise<void>;
  deposit: (
    amount: string,
    provider: ethers.providers.Web3Provider
  ) => Promise<void>;
  claim: (provider: ethers.providers.Web3Provider) => Promise<void>;
  withdraw: (provider: ethers.providers.Web3Provider) => Promise<void>;
  onNetworkChange: (networkName: string) => Promise<void>;
};

// Get initial contract base
let initialContractBase = ContractAddresses.bscMainnet;
const savedItem = localStorage.getItem("requiredNetwork");
if (savedItem === "Polygon") {
  initialContractBase = ContractAddresses.polygonMainnet;
}

const useStakeStore = create<StakeStore>(
  immerMiddleware((set, get) => ({
    pendingTx: null,
    kangalInfo: {
      address: initialContractBase.kangal,
      userBalance: null,
      totalSupply: null,
      priceUsd: null,
    },
    steakInfo: {
      address: initialContractBase.teak,
      userBalance: null,
      totalSupply: null,
      priceUsd: null,
    },
    poolInfo: {
      address: initialContractBase.staking,
      hasAllowance: null,
      firstDepositTimestamp: null,
      timeLimitPassed: null,
      totalStakedBalance: null,
      stakedBalance: null,
      pendingEarnings: null,
      totalLockedValue: null,
    },
    kangalPairAddress: initialContractBase.kangalPair,
    stablePairAddress: initialContractBase.stablePair,
    fetchInfo: async (provider, address) => {
      try {
        const kangal = ERC20__factory.connect(
          get().kangalInfo.address,
          provider
        );
        const kBalance = await kangal.balanceOf(address);
        const kAllowance = await kangal.allowance(
          address,
          get().poolInfo.address
        );

        const steak = ERC20__factory.connect(get().steakInfo.address, provider);
        const sBalance = await steak.balanceOf(address);
        const sTotalSupply = await steak.totalSupply();

        const stakingContract = StakingContract__factory.connect(
          get().poolInfo.address,
          provider
        );

        const totalStakedBalance = await stakingContract.totalStakedSupply();

        const stakedBalance = await stakingContract.stakedBalances(address);

        const pendingEarnings =
          await stakingContract.calculateTotalPendingRewards(address);

        const timeLimit = await stakingContract.minimumStakeTime();
        const firstDepositTimestamp =
          await stakingContract.firstDepositTimestamps(address);
        const now = Math.floor(Date.now() / 1000);
        const timeLimitPassed =
          now - firstDepositTimestamp.toNumber() > timeLimit.toNumber();

        const kangalPair = new ethers.Contract(
          get().kangalPairAddress,
          pancakePairAbi,
          provider
        );
        const stablePair = new ethers.Contract(
          get().stablePairAddress,
          pancakePairAbi,
          provider
        );
        const kangalPairReserves = await kangalPair.getReserves();
        const stablePairReserves = await stablePair.getReserves();

        const kangalPairKangal = Number(
          ethers.utils.formatUnits(kangalPairReserves[0])
        );
        const kangalPairOther = Number(
          ethers.utils.formatUnits(kangalPairReserves[1])
        );

        const networkName = useWalletStore.getState().requiredNetwork.name;

        const stablePairToken = Number(
          ethers.utils.formatUnits(
            stablePairReserves[networkName === "BSC" ? 0 : 1]
          )
        );
        const stablePairUSD = Number(
          ethers.utils.formatUnits(
            stablePairReserves[networkName === "BSC" ? 1 : 2]
          )
        );
        const pairedTokenPrice = stablePairUSD / stablePairToken;
        const kangalPrice =
          (kangalPairKangal / kangalPairOther) * pairedTokenPrice;
        const totalLockedValue =
          kangalPrice * Number(ethers.utils.formatUnits(totalStakedBalance));

        set((state) => {
          state.kangalInfo.userBalance = kBalance;

          state.steakInfo.userBalance = sBalance;
          state.steakInfo.totalSupply = sTotalSupply;

          state.poolInfo.hasAllowance = kAllowance.eq(0)
            ? false
            : kAllowance.gte(kBalance);
          state.poolInfo.firstDepositTimestamp = firstDepositTimestamp;
          state.poolInfo.timeLimitPassed = timeLimitPassed;
          state.poolInfo.totalStakedBalance = totalStakedBalance;
          state.poolInfo.stakedBalance = stakedBalance;
          state.poolInfo.pendingEarnings = pendingEarnings;
          state.poolInfo.totalLockedValue = totalLockedValue;
        });
      } catch (error) {
        console.log(error);
      }
    },
    approve: async (provider) => {
      const kangal = ERC20__factory.connect(
        get().kangalInfo.address,
        provider.getSigner()
      );
      try {
        const transaction = await kangal.approve(
          get().poolInfo.address,
          ethers.constants.MaxUint256
        );

        set((state) => {
          state.pendingTx = makeTx(
            TxType.approval,
            transaction.hash,
            useWalletStore.getState().requiredNetwork
          );
        });

        await transaction.wait();

        set((state) => {
          state.pendingTx = null;
          state.poolInfo.hasAllowance = true;
        });
      } catch (error) {
        set((state) => {
          state.pendingTx = null;
        });
        console.log(error);
      }
    },
    deposit: async (amount, provider) => {
      const stakingContract = StakingContract__factory.connect(
        get().poolInfo.address,
        provider.getSigner()
      );
      let parsedAmount = ethers.utils.parseUnits(amount);
      const transaction = await stakingContract.deposit(parsedAmount);

      set((state) => {
        state.pendingTx = makeTx(
          TxType.deposit,
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
      const stakingContract = StakingContract__factory.connect(
        get().poolInfo.address,
        provider.getSigner()
      );

      const transaction = await stakingContract.claimRewards();

      set((state) => {
        state.pendingTx = makeTx(
          TxType.rewardClaim,
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
    withdraw: async (provider) => {
      const stakingContract = StakingContract__factory.connect(
        get().poolInfo.address,
        provider.getSigner()
      );

      const transaction = await stakingContract.withdraw();

      set((state) => {
        state.pendingTx = makeTx(
          TxType.withdraw,
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
    onNetworkChange: async (networkName) => {
      let contractBase = ContractAddresses.bscMainnet;

      if (networkName === "Polygon") {
        contractBase = ContractAddresses.polygonMainnet;
      }

      set((state) => {
        state.kangalInfo = {
          address: contractBase.kangal,
          userBalance: null,
          totalSupply: null,
          priceUsd: null,
        };
        state.steakInfo = {
          address: contractBase.teak,
          userBalance: null,
          totalSupply: null,
          priceUsd: null,
        };
        state.poolInfo = {
          address: contractBase.staking,
          hasAllowance: null,
          firstDepositTimestamp: null,
          timeLimitPassed: null,
          totalStakedBalance: null,
          stakedBalance: null,
          pendingEarnings: null,
          totalLockedValue: null,
        };
        state.kangalPairAddress = contractBase.kangalPair;
        state.stablePairAddress = contractBase.stablePair;
      });
    },
  }))
);

function makeTx(
  type: TxType,
  transactionHash: string,
  requiredNetwork: Network
): Tx {
  return {
    type: type,
    hash: transactionHash,
    networkExplorerName: requiredNetwork.networkExplorerName,
    networkExplorerUrl:
      requiredNetwork.networkExporerUrl + `tx/${transactionHash}`,
  };
}

export default useStakeStore;
