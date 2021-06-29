import { BigNumber, ethers } from "ethers";
import create from "zustand";
import immerMiddleware from "./immerMiddleware";

import { ERC20__factory } from "../assets/typechain/factories/ERC20__factory";
import { StakingContract__factory } from "../assets/typechain/factories/StakingContract__factory";

import ContractAddresses from "../constants/contracts";

export type Tx = {
  type: string;
  hash: string;
};

type TokenInfo = {
  address: string;
  userBalance: BigNumber | null;
  totalSupply: BigNumber | null;
};

type PoolInfo = {
  address: string;
  hasAllowance: boolean | null;
  firstDepositTimestamp: BigNumber | null;
  timeLimitPassed: boolean | null;
  totalStakedBalance: BigNumber | null;
  stakedBalance: BigNumber | null;
  pendingEarnings: BigNumber | null;
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
};

const useStakeStore = create<StakeStore>(
  immerMiddleware((set, get) => ({
    pendingTx: null,
    kangalInfo: {
      address: ContractAddresses.kangal,
      userBalance: null,
      totalSupply: null,
    },
    steakInfo: {
      address: ContractAddresses.teak,
      userBalance: null,
      totalSupply: null,
    },
    poolInfo: {
      address: ContractAddresses.staking,
      hasAllowance: null,
      firstDepositTimestamp: null,
      timeLimitPassed: null,
      totalStakedBalance: null,
      stakedBalance: null,
      pendingEarnings: null,
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

        set((state) => {
          state.kangalInfo.userBalance = kBalance;

          state.steakInfo.userBalance = sBalance;
          state.steakInfo.totalSupply = sTotalSupply;

          state.poolInfo.hasAllowance = kAllowance.eq(
            ethers.utils.parseUnits("0")
          )
            ? false
            : kAllowance.gte(kBalance);
          state.poolInfo.firstDepositTimestamp = firstDepositTimestamp;
          state.poolInfo.timeLimitPassed = timeLimitPassed;
          state.poolInfo.totalStakedBalance = totalStakedBalance;
          state.poolInfo.stakedBalance = stakedBalance;
          state.poolInfo.pendingEarnings = pendingEarnings;
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
        state.pendingTx = { type: "APPROVAL", hash: transaction.hash };
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