import useWalletStore from "../store/walletStore";
import { ReactComponent as Spinner } from "../assets/images/spinner.svg";
import { ReactComponent as BSCIcon } from "../assets/images/bsc.svg";
import { ReactComponent as PolygonIcon } from "../assets/images/polygon.svg";
import { ReactComponent as Chevron } from "../assets/images/chevron.svg";

import { shrinkAddress } from "../utils/Formatters";
import SelectView from "./SelectView";

export default function ConnectButton() {
  const walletStore = useWalletStore();

  return (
    <div className="flex relative items-center">
      <div className="flex-row mr-4">
        <p className="text-white text-center font-semibold">Network</p>
        <div className="flex items-center space-x-2 relative">
          <div className="relative -top-px">
            {walletStore.requiredNetwork.chainId === 56 ? (
              <BSCIcon className="w-4 h-4" />
            ) : (
              <PolygonIcon className="w-4 h-4" />
            )}
          </div>

          <select
            className="inline bg-transparent text-white appearance-none w-20"
            value={walletStore.requiredNetwork.chainId.toString()}
            onChange={(event) => {
              const value = event.target.value;
              const network = walletStore.networkOptions.find((el) => {
                return value === el.chainId.toString();
              });
              if (network) {
                walletStore.changeRequiredNetwork(network);
              }
            }}
          >
            {walletStore.networkOptions.map((value) => {
              return <option value={value.chainId}>{value.name}</option>;
            })}
          </select>
          <div className="absolute w-5 h-full top-0 right-1 pointer-events-none">
            <div className="absolute-center w-full">
              <Chevron className="transform rotate-90 fill-current text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Spinner
          className={
            "absolute left-16 m-2 animate-spin h-5 w-5 text-white " +
            (walletStore.hasPendingConnect ? "block" : "hidden")
          }
        />

        <div
          className={
            "transition ease-in duration-150 delay-75 " +
            (walletStore.hasPendingConnect ? "opacity-0" : "opacity-100")
          }
        >
          <button
            onClick={walletStore.connect}
            className={
              "text-white font-semibold truncate py-2 px-4 w-40 rounded-lg transition-all hover:bg-opacity-80 " +
              (walletStore.address ? "bg-green " : "bg-orange ") +
              (walletStore.networkWarning ? "hidden" : "block")
            }
          >
            {walletStore.address
              ? shrinkAddress(walletStore.address)
              : "Connect wallet"}
          </button>
          <p
            className={
              "text-white text-xs max-w-xs pl-5 sm:text-sm sm:text-center " +
              (walletStore.networkWarning ? "block" : "hidden")
            }
          >
            {walletStore.networkWarning}
          </p>
        </div>
      </div>
    </div>
  );
}
