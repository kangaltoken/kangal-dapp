import useWalletStore from "../store/walletStore";
import { ReactComponent as Spinner } from "../assets/images/spinner.svg";

export default function ConnectButton() {
  const walletStore = useWalletStore();

  return (
    <div className="flex relative items-center">
      <Spinner
        className={
          "absolute left-20 -m-2 animate-spin h-5 w-5 text-white " +
          (walletStore.hasPendingConnect ? "block" : "hidden")
        }
      />

      <div
        className={
          "transition ease-in duration-150 delay-75 " +
          (walletStore.hasPendingConnect
            ? "hidden opacity-0"
            : "block opacity-100")
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
  );
}

function shrinkAddress(address: string): string {
  return address.slice(0, 6) + "..." + address.slice(37, 42);
}
