import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import ReactTooltip from "react-tooltip";

import useWalletStore from "../store/walletStore";
import useStakeStore from "../store/stakeStore";
import { formatAmount } from "../utils/Formatters";

import InfoBox from "../components/InfoBox";
import StakeAndEarnInfo from "../components/StakeAndEarnInfo";
import DepositTab from "../components/DepositTab";
import WithdrawTab from "../components/WithdrawTab";
import StakersList from "../components/StakersList";

import { ReactComponent as Logo } from "../assets/images/kangal-logo.svg";
import { ReactComponent as KangalSteak } from "../assets/images/kangal-steak.svg";
import { ReactComponent as SteakLogo } from "../assets/images/steak-logo.svg";

import { ReactComponent as DollarIcon } from "../assets/images/dollar-icon.svg";
import { ReactComponent as BlueCircle } from "../assets/images/blue-circle.svg";
import { ReactComponent as OrangeCircle } from "../assets/images/orange-circle.svg";
import { ReactComponent as GreenCircle } from "../assets/images/green-circle.svg";

function Staking() {
  const walletStore = useWalletStore();
  const stakeStore = useStakeStore();

  const [depositTabActive, setDepositTabActive] = useState(true);

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
    <div className="pb-10">
      <ReactTooltip effect="solid" multiline={true} />

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
            title="STAKED KANGAL BALANCE"
            amount={formatUnits(stakeStore.poolInfo.stakedBalance)}
            iconBackground={<GreenCircle />}
            iconForeground={<KangalSteak />}
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

        <div className="flex flex-col md:flex-row mt-5 bg-white shadow-sm overflow-hidden rounded-lg">
          <div className="w-full md:w-1/2">
            <StakeAndEarnInfo
              aprm={walletStore.requiredNetwork.name === "BSC" ? "30" : "35"}
            />
          </div>

          <div className="flex flex-col sm:flex-row p-4 md:w-1/2">
            <div className="flex-col order-last mt-6 text-center sm:mt-0 sm:order-first sm:text-left">
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-600">
                  CURRENT DEPOSIT
                </p>
                <p className="flex mt-1 place-content-center font-semibold text-body sm:place-content-start">
                  <Logo className="w-5 h-7 mr-1 -mt-1" />{" "}
                  {formatUnits(stakeStore.poolInfo.stakedBalance, 2, false)}{" "}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600">
                  PENDING EARNINGS
                </p>
                <p className="flex mt-1 place-content-center font-semibold text-body sm:place-content-start">
                  <SteakLogo className="w-5 h-7 mr-1 -mt-1" />{" "}
                  {formatUnits(stakeStore.poolInfo.pendingEarnings)}
                </p>
              </div>
              <div className="flex justify-center sm:justify-start mt-4 relative">
                {!stakeStore.poolInfo.timeLimitPassed && (
                  <div
                    data-tip="You will be able to claim rewards <br/>
                    once you've staked longer than the minimum stake time <br/>
                    (2 days) since first deposit"
                    className="mx-auto absolute cursor-help rounded-md w-24 h-full bg-black opacity-10 z-20"
                  />
                )}
                <button onClick={claim} className="relative">
                  <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
                  <p className="text-orange w-24 py-1 font-semibold tracking-wider">
                    CLAIM
                  </p>
                </button>
              </div>
            </div>
            <div className="flex-1 sm:-mt-1 sm:pl-4">
              <div className="text-center">
                <button
                  onClick={() => {
                    setDepositTabActive(true);
                  }}
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
      <div className="container mx-auto px-4">
        <div className="mt-10 sm:mt-20">
          <h1 className="text-body text-4xl font-bold">Top $TEAKers</h1>
        </div>

        <StakersList
          userAddress={walletStore.address ?? ""}
          requiredNetwork={walletStore.requiredNetwork.name}
        />
      </div>
    </div>
  );
}

function formatUnits(
  units: BigNumber | null,
  maximumFractionDigits: number = 2,
  compact: boolean = true
): string {
  if (units) {
    return formatAmount(units, maximumFractionDigits, compact);
  }
  return "...";
}

function formatTLV(number: number | null): string {
  if (number === 0) {
    return "0";
  }
  if (number) {
    return formatAmount(number);
  }
  return "...";
}

export default Staking;
