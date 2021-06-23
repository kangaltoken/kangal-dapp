import { ethers } from "ethers";
import create from "zustand";
import immerMiddleware from "./immerMiddleware";

import { ERC20__factory } from "../assets/typechain/factories/ERC20__factory";
import { StakingContract__factory } from "../assets/typechain/factories/StakingContract__factory";

type TokenInfo = {
  address: string;
  userBalance: string | null;
  totalSupply: string | null;
};

type PoolInfo = {
  address: string;
  totalStakedBalance: string | null;
  hasAllowance: boolean | null;
};

type StakeStore = {
  kangalInfo: TokenInfo;
  steakInfo: TokenInfo;
  poolInfo: PoolInfo;
  fetchInfo: (
    provider: ethers.providers.Web3Provider,
    address: string
  ) => Promise<void>;
  approve: (provider: ethers.providers.Web3Provider) => Promise<void>;
  deposit: (provider: ethers.providers.Web3Provider) => Promise<void>;
};

const useStakeStore = create<StakeStore>(
  immerMiddleware((set, get) => ({
    kangalInfo: {
      address: "0xa9a96A85A6253fBA6c79211B84370D3601142653",
      userBalance: null,
      totalSupply: null,
    },
    steakInfo: {
      address: "0xe6A8d67C25699B6d66A4d7b530e0424a002EB10D",
      userBalance: null,
      totalSupply: null,
    },
    poolInfo: {
      address: "0xa76e291EEc2e24F1EccA2217095325091235fDbf",
      totalStakedBalance: null,
      hasAllowance: null,
    },
    fetchInfo: async (provider, address) => {
      try {
        const kangal = ERC20__factory.connect(
          get().kangalInfo.address,
          provider
        );
        const kBalance = await kangal.balanceOf(address);
        const kBalanceFormatted = ethers.utils.formatUnits(kBalance);

        const kAllowance = await kangal.allowance(
          address,
          get().poolInfo.address
        );
        console.log(kAllowance.toString());

        const steak = ERC20__factory.connect(get().steakInfo.address, provider);
        const sBalance = ethers.utils.formatUnits(
          await steak.balanceOf(address)
        );
        const sTotalSupply = ethers.utils.formatUnits(
          await steak.totalSupply()
        );

        const stakingContract = StakingContract__factory.connect(
          get().poolInfo.address,
          provider
        );
        const totalStakedBalance = ethers.utils.formatUnits(
          await stakingContract.totalStakedSupply()
        );

        set((state) => {
          state.kangalInfo.userBalance = kBalanceFormatted;
          state.steakInfo.userBalance = sBalance;
          state.steakInfo.totalSupply = sTotalSupply;
          state.poolInfo.totalStakedBalance = totalStakedBalance;
          state.poolInfo.hasAllowance = kAllowance.gte(kBalance);
        });
      } catch (error) {}
    },
    approve: async (provider) => {
      const kangal = ERC20__factory.connect(
        get().kangalInfo.address,
        provider.getSigner()
      );
      await kangal.approve(get().poolInfo.address, ethers.constants.MaxUint256);
    },
    deposit: async (provider) => {
      const stakingContract = StakingContract__factory.connect(
        get().poolInfo.address,
        provider.getSigner()
      );
      await stakingContract.deposit(ethers.utils.parseUnits("500000"));
    },
  }))
);

export default useStakeStore;
