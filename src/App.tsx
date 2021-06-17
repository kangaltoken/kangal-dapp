//import { useEffect } from "react";

//import { MainToken__factory } from "./typechain/factories/MainToken__factory";
//const mainTokenAddress = "0xa9a96A85A6253fBA6c79211B84370D3601142653";
import useWalletStore from "./store/walletStore";

import ConnectButton from "./components/ConnectButton";

import { ReactComponent as Logo } from "./images/logo.svg";

function App() {
  const walletStore = useWalletStore();

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
    <div className="min-h-screen bg-body">
      {/* Nav */}
      <div className="flex h-20 px-10 py-5 bg-darkBlue">
        <Logo className="h-10" />
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <h1>Stake</h1>
      </div>
    </div>
  );
}

export default App;
