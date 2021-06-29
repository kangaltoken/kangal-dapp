import { useEffect, useState } from "react";
import { ReactComponent as Spinner } from "../assets/images/spinner.svg";

import { Tx } from "../store/stakeStore";

interface INotificationPopup {
  transaction: Tx | null;
}

export default function NotificationPopup(props: INotificationPopup) {
  const [tx, setTx] = useState<Tx>();

  useEffect(() => {
    if (props.transaction) {
      setTx(props.transaction);
    }
  }, [props]);

  return (
    <div className="ml-4 mr-4 sm:max-w-xs sm:ml-auto">
      <div className="flex items-center absolute top-4 px-6 py-4 rounded shadow-xl bg-white">
        <Spinner className="animate-spin mr-4 h-5 w-5 text-body" />
        <div>
          <p>
            Pending <span className="font-semibold">{tx?.type}</span>{" "}
            transaction
          </p>
          <a
            className="text-green"
            target="_blank"
            rel="noreferrer"
            href={"https://rinkeby.etherscan.io/tx/" + tx?.hash}
          >
            See on bscscan.com
          </a>
        </div>
      </div>
    </div>
  );
}
