import { useEffect, useState } from "react";
import { PlayState, Tween } from "react-gsap";

import { Tx } from "../store/stakeStore";

import { ReactComponent as Spinner } from "../assets/images/spinner.svg";

interface INotificationPopup {
  playState: PlayState;
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
    <div className="top-2 z-10 h-0 sm:max-w-xs sm:ml-auto">
      <Tween
        from={{ opacity: "0", display: "none" }}
        to={{ opacity: "1", display: "block" }}
        duration={0.4}
        ease="back.out(1)"
        playState={props.playState}
      >
        <div className="p-2">
          <div className="flex items-center px-6 py-4 rounded shadow-xl bg-white">
            <Spinner className="animate-spin mr-4 h-5 w-5 text-body" />
            <div>
              <p>
                <span className="font-semibold">{tx?.type}</span> transaction
              </p>
              <a
                className="text-green"
                target="_blank"
                rel="noreferrer"
                href={"https://bscscan.com/tx/" + tx?.hash}
              >
                See on bscscan.com
              </a>
            </div>
          </div>
        </div>
      </Tween>
    </div>
  );
}
