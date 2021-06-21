//import { useEffect } from "react";

//import { MainToken__factory } from "./typechain/factories/MainToken__factory";
//const mainTokenAddress = "0xa9a96A85A6253fBA6c79211B84370D3601142653";
import useWalletStore from "./store/walletStore";

import ConnectButton from "./components/ConnectButton";
import PoolInfoBox from "./components/PoolInfoBox";

import { ReactComponent as Logo } from "./assets/images/kangal-logo.svg";
import { ReactComponent as SteakLogo } from "./assets/images/steak-logo.svg";
import { ReactComponent as Logotype } from "./assets/images/kangal-logotype.svg";
import { ReactComponent as DollarIcon } from "./assets/images/dollar-icon.svg";
import { ReactComponent as BlueCircle } from "./assets/images/blue-circle.svg";
import { ReactComponent as OrangeCircle } from "./assets/images/orange-circle.svg";
import { ReactComponent as GreenCircle } from "./assets/images/green-circle.svg";
// import { ReactComponent as KangalCircledBlue } from "./assets/images/kangal-in-circle.svg";
// import { ReactComponent as SteakCircleRed } from "./assets/images/steak-in-circle.svg";
// import { ReactComponent as DollarCircle } from "./assets/images/dollar-in-circle.svg";

function App() {
  //const walletStore = useWalletStore();

  // useEffect(() => {
  //   walletStore.connect();
  // }, []);

  // useEffect(() => {
  //   async function setAddress() {
  //     let address = await web3Modal.provider?.getSigner().getAddress();
  //     if (address) {
  //       selectedWalletSet(address);
  //     } else {
  //       selectedWalletSet("");
  //     }
  //   }
  //   setAddress();
  // }, [web3Modal.provider]);

  // useEffect(() => {
  //   async function getBalanceOfConnectedWallet() {
  //     const provider = web3Modal.provider;
  //     if (provider == null) return;
  //     if (selectedWallet === "") return;

  //     const mainToken = MainToken__factory.connect(mainTokenAddress, provider);
  //     let balance = "";
  //     try {
  //       balance = ethers.utils.formatUnits(
  //         await mainToken.balanceOf(selectedWallet)
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     mainTokenBalanceSet(balance);
  //   }
  //   getBalanceOfConnectedWallet();
  // }, [web3Modal.provider, selectedWallet]);

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
        <div className="mt-20">
          <h1 className="text-body text-4xl font-bold">Stake</h1>
        </div>
        <div className="flex space-x-8 mt-6">
          <PoolInfoBox
            title="TOTAL STAKED KANGAL"
            amount={123123123}
            iconBackground={<BlueCircle />}
            iconForeground={<Logo />}
          />
          <PoolInfoBox
            title="TOTAL STAKED KANGAL"
            amount={123123123}
            iconBackground={<OrangeCircle />}
            iconForeground={<SteakLogo />}
          />
          <PoolInfoBox
            title="TOTAL STAKED KANGAL"
            amount={123123123}
            iconBackground={<GreenCircle />}
            iconForeground={<DollarIcon />}
          />
          {/* <PoolInfoBox
            title="TOTAL EARNED $TEAK"
            amount={123123123}
            icon={<SteakCircleRed />}
          />
          <PoolInfoBox
            title="TOTAL LOCKED VALUE"
            amount={123123123}
            icon={<DollarCircle />}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
