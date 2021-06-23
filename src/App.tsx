import { useEffect } from "react";
import useWalletStore from "./store/walletStore";
import useStakeStore from "./store/stakeStore";
import { ethers } from "ethers";

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

function App() {
  const walletStore = useWalletStore();
  const stakeStore = useStakeStore();

  useEffect(() => {
    if (walletStore.provider && walletStore.address) {
      stakeStore.fetchInfo(walletStore.provider, walletStore.address);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletStore.provider, walletStore.address]);

  const approve = () => {
    console.log(stakeStore.poolInfo.hasAllowance);
    // if (walletStore.provider && walletStore.address) {
    //   stakeStore.approve(walletStore.provider);
    // }
  };

  const deposit = async () => {
    if (walletStore.provider && walletStore.address) {
      stakeStore.deposit(walletStore.provider);
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

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 mt-6">
          <InfoBox
            title="WALLET KANGAL BALANCE"
            amount={ethers.utils.commify(
              stakeStore.kangalInfo.userBalance
                ? stakeStore.kangalInfo.userBalance
                : ""
            )}
            iconBackground={<BlueCircle />}
            iconForeground={<Logo />}
          />
          <InfoBox
            title="WALLET $TEAK BALANCE"
            amount={ethers.utils.commify(
              stakeStore.steakInfo.userBalance
                ? stakeStore.steakInfo.userBalance
                : ""
            )}
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
            amount={ethers.utils.commify(
              stakeStore.poolInfo.totalStakedBalance
                ? stakeStore.poolInfo.totalStakedBalance
                : ""
            )}
            iconBackground={<BlueCircle />}
            iconForeground={<Logo />}
          />
          <InfoBox
            title="TOTAL $TEAK CLAIMED"
            amount={ethers.utils.commify(
              stakeStore.steakInfo.totalSupply
                ? stakeStore.steakInfo.totalSupply
                : ""
            )}
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
          <div className="md:w-1/2 p-4">
            <div className="flex-col">
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-600">DEPOSIT</p>
                <p>0 KANGAL</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-600">EARNINGS</p>
                <p>0 $TEAK</p>
              </div>
              <button className="mt-4 relative">
                <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
                <p className="text-orange px-5 py-1 font-semibold tracking-wider">
                  CLAIM
                </p>
              </button>
            </div>
          </div>
          {/* <button onClick={approve} className="mr-4">
            Approve
          </button>
          <button onClick={deposit}>Deposit</button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
