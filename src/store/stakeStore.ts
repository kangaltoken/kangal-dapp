import { BigNumber, ethers } from "ethers";
import create from "zustand";
import immerMiddleware from "./immerMiddleware";

import { ERC20__factory } from "../assets/typechain/factories/ERC20__factory";
import { StakingContract__factory } from "../assets/typechain/factories/StakingContract__factory";

import ContractAddresses from "../constants/contracts";

const pancakePairAbi = [
  "function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)",
];

const kangalBnbPairAddress = "0x4E3f77687dd3C61F4e1B919aa4Ded90AE1766894";
const wbnbBusdPairAddress = "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16";

export type Tx = {
  type: string;
  hash: string;
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
  fetchInfo: (
    provider: ethers.providers.Web3Provider,
    address: string
  ) => Promise<void>;
  approve: (provider: ethers.providers.Web3Provider) => Promise<void>;
  deposit: (
    amount: string,
    provider: ethers.providers.Web3Provider
  ) => Promise<void>;
  claim: (provider: ethers.providers.Web3Provider) => Promise<void>;
  withdraw: (provider: ethers.providers.Web3Provider) => Promise<void>;
};

const useStakeStore = create<StakeStore>(
  immerMiddleware((set, get) => ({
    pendingTx: null,
    kangalInfo: {
      address: ContractAddresses.bscMainnet.kangal,
      userBalance: null,
      totalSupply: null,
      priceUsd: null,
    },
    steakInfo: {
      address: ContractAddresses.bscMainnet.teak,
      userBalance: null,
      totalSupply: null,
      priceUsd: null,
    },
    poolInfo: {
      address: ContractAddresses.bscMainnet.staking,
      hasAllowance: null,
      firstDepositTimestamp: null,
      timeLimitPassed: null,
      totalStakedBalance: null,
      stakedBalance: null,
      pendingEarnings: null,
      totalLockedValue: null,
    },
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
          kangalBnbPairAddress,
          pancakePairAbi,
          provider
        );
        const wbnbPair = new ethers.Contract(
          wbnbBusdPairAddress,
          pancakePairAbi,
          provider
        );
        const kangalPairReserves = await kangalPair.getReserves();
        const wbnbPairReserves = await wbnbPair.getReserves();

        const kangalPairKangal = Number(
          ethers.utils.formatUnits(kangalPairReserves[0])
        );
        const kangalPairBnb = Number(
          ethers.utils.formatUnits(kangalPairReserves[1])
        );

        const wbnbPairWbnb = Number(
          ethers.utils.formatUnits(wbnbPairReserves[0])
        );
        const wbnbPairBusd = Number(
          ethers.utils.formatUnits(wbnbPairReserves[1])
        );
        const bnbPrice = wbnbPairBusd / wbnbPairWbnb;
        const kangalPrice = (kangalPairKangal / kangalPairBnb) * bnbPrice;
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
          state.pendingTx = { type: "APPROVAL", hash: transaction.hash };
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
        state.pendingTx = { type: "DEPOSIT", hash: transaction.hash };
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
        state.pendingTx = { type: "CLAIM REWARDS", hash: transaction.hash };
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
        state.pendingTx = { type: "WITHDRAW", hash: transaction.hash };
      });

      const receipt = await transaction.wait();

      set((state) => {
        state.pendingTx = null;
      });

      get().fetchInfo(provider, receipt.from);
    },
  }))
);

export default useStakeStore;
