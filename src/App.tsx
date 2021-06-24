import { useState, useEffect } from "react";
import useWalletStore from "./store/walletStore";
import useStakeStore from "./store/stakeStore";
import { BigNumber, ethers } from "ethers";

import ConnectButton from "./components/ConnectButton";
import InfoBox from "./components/InfoBox";
import StakeAndEarnInfo from "./components/StakeAndEarnInfo";

import { ReactComponent as Logo } from "./assets/images/kangal-logo.svg";
import { ReactComponent as SteakLogo } from "./assets/images/steak-logo.svg";
import { ReactComponent as Logotype } from "./assets/images/kangal-logotype.svg";
import { ReactComponent as DollarIcon } from "./assets/images/dollar-icon.svg";
import { ReactComponent as BlueCircle } from "./assets/images/blue-circle.svg";
import { ReactComponent as OrangeCircle } from "./assets/images/orange-circle.svg";
import { ReactComponent as GreenCircle } from "./assets/images/green-circle.svg";
import NotificationPopup from "./components/NotificationPopup";

function App() {
  const walletStore = useWalletStore();
  const stakeStore = useStakeStore();

  const [depositTabActive, setDepositTabActive] = useState(true);
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    if (walletStore.provider && walletStore.address) {
      stakeStore.fetchInfo(walletStore.provider, walletStore.address);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletStore.provider, walletStore.address]);

  const approve = () => {
    if (walletStore.provider && walletStore.address) {
      stakeStore.approve(walletStore.provider);
    }
  };

  const deposit = async (amount: string) => {
    if (walletStore.provider && walletStore.address) {
      console.log(ethers.utils.parseUnits(amount).toString());
      console.log(
        ethers.utils.formatUnits(ethers.utils.parseUnits(amount)).toString()
      );
      //stakeStore.deposit(amount, walletStore.provider);
    }
  };

  return (
    <div className="antialiased min-h-screen bg-mainbg">
      {/* Nav */}
      <div className="flex h-20 px-10 items-center bg-darkBlue">
        <div className="flex h-8">
          <Logo className="w-8 h-8" />
          <Logotype className="ml-2 mt-2" />
        </div>
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>

      {stakeStore.pendingTx && (
        <div className="sticky top-4 z-10 h-0">
          <NotificationPopup
            txType={stakeStore.pendingTx.type}
            txHash={stakeStore.pendingTx.hash}
          />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="mt-10">
          <h1 className="text-body text-4xl font-bold">Wallet</h1>
        </div>
        <div className="flex space-x-8 mt-6">
          <InfoBox
            title="KANGAL BALANCE"
            amount={formatUnits(stakeStore.kangalInfo.userBalance)}
            iconBackground={<BlueCircle />}
            iconForeground={<Logo />}
          />
          <InfoBox
            title="$TEAK BALANCE"
            amount={formatUnits(stakeStore.steakInfo.userBalance)}
            iconBackground={<OrangeCircle />}
            iconForeground={<SteakLogo />}
          />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mt-20">
          <h1 className="text-body text-4xl font-bold">Stake for $TEAK</h1>
        </div>
        <div className="flex space-x-8 mt-6">
          <InfoBox
            title="TOTAL KANGAL STAKED"
            amount={formatUnits(stakeStore.poolInfo.totalStakedBalance)}
            iconBackground={<BlueCircle />}
            iconForeground={<Logo />}
          />
          <InfoBox
            title="TOTAL $TEAK CLAIMED"
            amount={formatUnits(stakeStore.steakInfo.totalSupply)}
            iconBackground={<OrangeCircle />}
            iconForeground={<SteakLogo />}
          />
          <InfoBox
            title="TOTAL VALUE LOCKED"
            amount={null}
            iconBackground={<GreenCircle />}
            iconForeground={<DollarIcon />}
          />
        </div>

        <div className="flex mt-5 bg-white shadow-k overflow-hidden rounded-lg">
          <div className="md:w-1/2">
            <StakeAndEarnInfo />
          </div>

          <div className="md:w-1/2 p-4 flex">
            <div className="flex-col">
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-600">
                  CURRENT DEPOSIT
                </p>
                <p>{formatUnits(stakeStore.poolInfo.stakedBalance)} KANGAL</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600">
                  PENDING EARNINGS
                </p>
                <p>{formatUnits(stakeStore.poolInfo.pendingEarnings)} $TEAK</p>
              </div>
              <button className="mt-4 relative">
                <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
                <p className="text-orange px-5 py-1 font-semibold tracking-wider">
                  CLAIM
                </p>
              </button>
            </div>
            <div className="flex-1 -mt-1">
              <div className="text-center">
                <button
                  onClick={() => setDepositTabActive(true)}
                  className={"mr-4 " + (depositTabActive ? "active-tab" : "")}
                >
                  Deposit
                </button>
                <button
                  onClick={() => setDepositTabActive(false)}
                  className={"" + (!depositTabActive ? "active-tab" : "")}
                >
                  Withdraw
                </button>
              </div>

              {depositTabActive ? (
                <div>
                  <div className="flex justify-center">
                    <div className="mt-5 w-1/2">
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
                        if (stakeStore.kangalInfo.userBalance) {
                          const amount = ethers.utils
                            .formatUnits(stakeStore.kangalInfo.userBalance)
                            .replace(",", ".");
                          setDepositAmount(amount);
                        }
                      }}
                    >
                      MAX
                    </button>
                  </div>
                  <button
                    className="flex mx-auto mt-6 relative"
                    onClick={() => {
                      if (stakeStore.poolInfo.hasAllowance !== null) {
                        stakeStore.poolInfo.hasAllowance
                          ? deposit(depositAmount)
                          : approve();
                      }
                    }}
                  >
                    <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
                    <p className="text-orange px-5 py-1 font-semibold tracking-wider">
                      {stakeStore.poolInfo.hasAllowance == null
                        ? "..."
                        : stakeStore.poolInfo.hasAllowance
                        ? "DEPOSIT"
                        : "APPROVE"}
                    </p>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mt-2 mx-auto max-w-xs">
                    <p className="text-xs">
                      - You will withdraw all of your deposit
                    </p>
                    <p className="text-xs">
                      - You will be able to claim rewards if you've staked
                      longer than the minimum stake time (2 days) since first
                      deposit
                    </p>
                    <p className="text-xs">
                      - There is a 0.1% KANGAL withdrawal fee
                    </p>
                  </div>
                  <button
                    className="flex mx-auto mt-6 relative"
                    onClick={() => deposit(depositAmount)}
                  >
                    <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
                    <p className="text-orange px-5 py-1 font-semibold tracking-wider">
                      WITHDRAW
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatUnits(units: BigNumber | null): string {
  if (units) {
    const remainder = units.mod(1e15);
    const formatted = ethers.utils.formatUnits(units.sub(remainder));
    return ethers.utils.commify(formatted);
  }
  return "...";
}

export default App;
