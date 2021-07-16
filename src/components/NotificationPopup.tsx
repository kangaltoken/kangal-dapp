import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { Tx } from "../store/stakeStore";

import { ReactComponent as Spinner } from "../assets/images/spinner.svg";

interface INotificationPopup {
  playState: boolean;
  transaction: Tx | null;
}

export default function NotificationPopup(props: INotificationPopup) {
  const [tx, setTx] = useState<Tx>();

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
    <div className="absolute right-0 w-80 h-0">
      <div
        id="notification-card"
        className="top-2 relative z-10 sm:max-w-xs sm:ml-auto opacity-0"
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
      </div>
    </div>
  );
}
