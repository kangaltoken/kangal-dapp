import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { Txn } from "../store/tokenStore";

import { ReactComponent as Spinner } from "../assets/images/spinner.svg";

interface INotificationPopup {
  playState: boolean;
  transaction: Txn | null;
}

export default function NotificationPopup(props: INotificationPopup) {
  const [tx, setTx] = useState<Txn>();

  const tl = useRef<gsap.core.Timeline>();
  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .set("#notification-card", {
        x: "300px",
      })
      .to("#notification-card", { autoAlpha: 1, x: "0" });
  }, []);

  useEffect(() => {
    props.playState ? tl.current?.play() : tl.current?.reverse();
  }, [props.playState]);

  useEffect(() => {
    if (props.transaction) {
      setTx(props.transaction);
    }
  }, [props]);

  return (
    <div className="absolute w-full h-0 z-50">
      <div id="notification-card" className="fixed top-0 right-0 opacity-0">
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
                href={props.transaction?.networkExplorerUrl ?? ""}
              >
                See on {props.transaction?.networkExplorerName}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
