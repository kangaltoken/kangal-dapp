import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

import { ReactComponent as SteakLogo } from "../assets/images/steak-logo.svg";

import useWalletStore from "../store/walletStore";
import useTokenStore, { TokenStore } from "../store/tokenStore";

import { formatUnits } from "../utils/Formatters";
import steakBalancePolygon from "../utils/SteakBalancePolygon";

export default function SteakBridge() {
  const walletStore = useWalletStore();
  const tokenStore = useTokenStore();

  useEffect(() => {
    if (walletStore.provider === null || walletStore.address === null) {
      return;
    }

    if (tokenStore.steakInfo.userBalance === null) {
      tokenStore.fetchInfo(walletStore.provider, walletStore.address);
    }
  }, [tokenStore, walletStore]);

  const [polygonSteakBalance, setPolygonStakeBalance] =
    useState<BigNumber | null>(null);

  useEffect(() => {
    if (walletStore.address === null) {
      return;
    }

    const address = walletStore.address;

    async function updateSteakPolygonBalance(address: string) {
      const balance = await steakBalancePolygon(address);
      setPolygonStakeBalance(balance);
    }

    const interval = setInterval(
      () => updateSteakPolygonBalance(address),
      3000
    );

    return () => {
      clearInterval(interval);
    };
  }, [walletStore.address]);

  const [depositAmount, setDepositAmount] = useState("");

  const approve = () => {
    if (walletStore.provider && walletStore.address) {
      tokenStore.approveSteak(walletStore.provider);
    }
  };

  const bridge = async (amount: string) => {
    if (walletStore.provider && walletStore.address) {
      tokenStore.bridgeSteak(amount, walletStore.provider);
    }
  };

  return (
    <>
      {walletStore.requiredNetwork.name !== "BSC" && (
        <div className="p-6 mt-4 bg-white rounded-lg shadow-sm">
          <div>⚠️ Please change network to BSC to use $TEAK bridge.</div>
        </div>
      )}

      {walletStore.requiredNetwork.name === "BSC" && (
        <div className="p-6 mt-4 bg-white rounded-lg shadow-sm">
          <div className="flex">
            <div className="relative w-10 h-10">
              <SteakLogo />
            </div>
            <div className="ml-4">
              <h3 className="text-xs font-bold text-gray-600">
                $TEAK BALANCE (BSC)
              </h3>
              <h2 className="text-2xl mt-2 text-body font-bold">
                {formatUnits(tokenStore.steakInfo.userBalance)}
              </h2>
            </div>
            <div className="ml-4">
              <h3 className="text-xs font-bold text-gray-600">
                $TEAK BALANCE (Polygon)
              </h3>
              <h2 className="text-2xl mt-2 text-body font-bold">
                {formatUnits(polygonSteakBalance)}
              </h2>
            </div>
          </div>
          <div>
            <div className="flex-col sm:max-w-xs">
              <h3 className="mt-5 text-xs font-bold text-gray-600">
                BRIDGE AMOUNT
              </h3>
              <div className="flex">
                <div className="flex-1">
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
                    if (tokenStore.steakInfo.userBalance) {
                      const amount = ethers.utils
                        .formatUnits(tokenStore.steakInfo.userBalance)
                        .replace(",", ".");
                      setDepositAmount(amount);
                    }
                  }}
                >
                  MAX
                </button>
              </div>
              <p className="mt-2 text-xs">Operation fee: 0.0002 BNB</p>
            </div>
            <button
              className="flex mt-6 relative"
              onClick={() => {
                if (tokenStore.steakInfo?.userBalance?.eq(0)) {
                  return;
                }
                if (tokenStore.bridgeInfo.hasAllowance !== null) {
                  tokenStore.bridgeInfo.hasAllowance
                    ? bridge(depositAmount)
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
        </div>
      )}

      <div className="p-6 mt-4 bg-white rounded-lg shadow-sm">
        <div className="max-w-xl text-body">
          $TEAK bridge works by burning tokens on BSC side, and then minting and
          sending the bridged amount to your wallet address on Polygon.
          <br />
          <br />
          Bridging usually takes around 2 minutes, but it can take longer if the
          network conditions are not optimal. All operations are recorded on
          blockchain, please <em>don't panic</em> in case the wait time is
          longer than usual.
        </div>
      </div>
    </>
  );
}

function makeDepositButtonText(stakeInfo: TokenStore): string {
  if (stakeInfo.steakInfo.userBalance?.eq(0)) {
    return "NO BALANCE";
  }
  return stakeInfo.bridgeInfo.hasAllowance == null
    ? "..."
    : stakeInfo.bridgeInfo.hasAllowance
    ? "BRIDGE"
    : "APPROVE";
}
