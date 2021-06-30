import { useState, useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import { PlayState } from "react-gsap";

import useWalletStore from "./store/walletStore";
import useStakeStore from "./store/stakeStore";

import ConnectButton from "./components/ConnectButton";
import InfoBox from "./components/InfoBox";
import StakeAndEarnInfo from "./components/StakeAndEarnInfo";
import NotificationPopup from "./components/NotificationPopup";
import DepositTab from "./components/DepositTab";
import WithdrawTab from "./components/WithdrawTab";

import { ReactComponent as Logo } from "./assets/images/kangal-logo.svg";
import { ReactComponent as SteakLogo } from "./assets/images/steak-logo.svg";
import { ReactComponent as Logotype } from "./assets/images/kangal-logotype.svg";
import { ReactComponent as DollarIcon } from "./assets/images/dollar-icon.svg";
import { ReactComponent as BlueCircle } from "./assets/images/blue-circle.svg";
import { ReactComponent as OrangeCircle } from "./assets/images/orange-circle.svg";
import { ReactComponent as GreenCircle } from "./assets/images/green-circle.svg";

function App() {
  const walletStore = useWalletStore();
  const stakeStore = useStakeStore();

  const [depositTabActive, setDepositTabActive] = useState(true);
  const [playState, setPlayState] = useState(PlayState.pause);

  useEffect(() => {
    stakeStore.pendingTx
      ? setPlayState(PlayState.play)
      : setPlayState(PlayState.reverse);
  }, [stakeStore.pendingTx]);

  useEffect(() => {
    if (walletStore.provider && walletStore.address) {
      stakeStore.fetchInfo(walletStore.provider, walletStore.address);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletStore.provider, walletStore.address]);

  const claim = () => {
    if (walletStore.provider) {
      if (
        !stakeStore.poolInfo.pendingEarnings?.eq(0) &&
        stakeStore.poolInfo.timeLimitPassed
      ) {
        stakeStore.claim(walletStore.provider);
      }
    }
  };

  return (
    <div className="antialiased min-h-screen bg-mainbg pb-10">
      {/* Nav */}
      <div className="flex h-20 px-4 sm:px-10 items-center bg-darkBlue">
        <div className="flex h-8">
          <Logo className="w-8 h-8" />
          <Logotype className="ml-2 mt-2" />
        </div>
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>

      <div className="sticky top-0 z-10">
        <NotificationPopup
          playState={playState}
          transaction={stakeStore.pendingTx}
        />
      </div>

      <div className="mt-4 px-4 flex">
        <div className="mx-auto bg-white shadow-sm px-3 py-2 rounded">
          Using Smart Contracts, Tokens, and Crypto is always a risk. DYOR
          before investing.
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="mt-10">
          <h1 className="text-body text-4xl font-bold">Wallet</h1>
        </div>
        <div className="flex-col space-y-4 sm:flex sm:flex-row sm:space-y-0 sm:space-x-8 mt-6">
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
        <div className="mt-10 sm:mt-20">
          <h1 className="text-body text-4xl font-bold">Stake for $TEAK</h1>
        </div>
        <div className="flex-col space-y-4 sm:flex sm:flex-row sm:space-y-0 sm:space-x-8 mt-6">
          <InfoBox
            title="TOTAL KANGAL STAKED"
            amount={formatUnits(stakeStore.poolInfo.totalStakedBalance)}
            iconBackground={<BlueCircle />}
            iconForeground={<Logo />}
          />
          <InfoBox
            title="TOTAL VALUE LOCKED"
            amount={formatTLV(stakeStore.poolInfo.totalLockedValue)}
            iconBackground={<GreenCircle />}
            iconForeground={<DollarIcon />}
          />
          <InfoBox
            title="TOTAL $TEAK CLAIMED"
            amount={formatUnits(stakeStore.steakInfo.totalSupply)}
            iconBackground={<OrangeCircle />}
            iconForeground={<SteakLogo />}
          />
        </div>

        <div className="flex flex-col md:flex-row mt-5 bg-white shadow-k overflow-hidden rounded-lg">
          <div className="w-full md:w-1/2">
            <StakeAndEarnInfo />
          </div>

          <div className="flex flex-col sm:flex-row p-4 md:w-1/2">
            <div className="flex-col order-last mt-6 text-center sm:mt-0 sm:order-first sm:text-left">
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
              <button onClick={claim} className="mt-4 relative">
                <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
                <p className="text-orange px-5 py-1 font-semibold tracking-wider">
                  CLAIM
                </p>
              </button>
            </div>
            <div className="flex-1 sm:-mt-1 sm:pl-4">
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

              {depositTabActive ? <DepositTab /> : <WithdrawTab />}
            </div>
            <div className="sm:hidden h-px w-full mt-4 bg-gray-200" />
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

function formatTLV(number: number | null): string {
  if (number) {
    return number
      .toFixed(3)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return "...";
}

export default App;
