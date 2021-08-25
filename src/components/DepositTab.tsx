import { ethers } from "ethers";
import { useState } from "react";
import useTokenStore, { TokenStore } from "../store/tokenStore";
import useWalletStore from "../store/walletStore";

export default function DepositTab() {
  const walletStore = useWalletStore();
  const tokenStore = useTokenStore();

  const [depositAmount, setDepositAmount] = useState("");

  const approve = () => {
    if (walletStore.provider && walletStore.address) {
      tokenStore.approveKangal(walletStore.provider);
    }
  };

  const deposit = async (amount: string) => {
    if (walletStore.provider && walletStore.address) {
      tokenStore.depositKangal(amount, walletStore.provider);
    }
  };

  return (
    <div>
      <div className="flex-col mx-auto sm:px-4 sm:max-w-xs">
        <div className="flex">
          <div className="mt-5 flex-1">
            <input
              className="p-2 w-full"
              type="text"
              placeholder="0"
              value={depositAmount}
              onChange={(e) => {
                const regexp = /^-?\d*\.?\d*$/;
                const value = e.target.value;
                if (regexp.test(value) || "" === value) {
                  setDepositAmount(e.target.value);
                }
              }}
            />
            <div className="h-px bg-body" />
          </div>
          <button
            className="mt-5 ml-2"
            onClick={() => {
              if (tokenStore.kangalInfo.userBalance) {
                const amount = ethers.utils
                  .formatUnits(tokenStore.kangalInfo.userBalance)
                  .replace(",", ".");
                setDepositAmount(amount);
              }
            }}
          >
            MAX
          </button>
        </div>
        <p className="mt-2 text-xs">Minimum deposit amount is 500K</p>
      </div>
      <button
        className="flex mx-auto mt-6 relative"
        onClick={() => {
          if (tokenStore.kangalInfo?.userBalance?.eq(0)) {
            return;
          }
          if (tokenStore.poolInfo.hasAllowance !== null) {
            tokenStore.poolInfo.hasAllowance
              ? deposit(depositAmount)
              : approve();
          }
        }}
      >
        <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
        <p className="text-orange px-5 py-1 font-semibold tracking-wider">
          {makeDepositButtonText(tokenStore)}
        </p>
      </button>
    </div>
  );
}

function makeDepositButtonText(stakeInfo: TokenStore): string {
  if (stakeInfo.kangalInfo.userBalance?.eq(0)) {
    return "NO BALANCE";
  }
  return stakeInfo.poolInfo.hasAllowance == null
    ? "..."
    : stakeInfo.poolInfo.hasAllowance
    ? "DEPOSIT"
    : "APPROVE";
}
