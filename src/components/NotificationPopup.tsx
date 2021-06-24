import { ReactComponent as Spinner } from "../assets/images/spinner.svg";

interface INotificationPopup {
  txType: string;
  txHash: string;
}

export default function NotificationPopup(props: INotificationPopup) {
  return (
    <div className="ml-4 mr-4 sm:max-w-xs sm:ml-auto">
      <div className="flex items-center absolute top-4 px-6 py-4 rounded shadow-xl bg-white">
        <Spinner className="animate-spin mr-4 h-5 w-5 text-body" />
        <div>
          <p>
            Pending <span className="font-semibold">{props.txType}</span>{" "}
            transaction
          </p>
          <a
            className="text-green"
            target="_blank"
            rel="noreferrer"
            href={"https://rinkeby.etherscan.io/tx/" + props.txHash}
          >
            See on bscscan.com
          </a>
        </div>
      </div>
    </div>
  );
}
