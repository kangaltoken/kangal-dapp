import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useStakeStore from "../store/stakeStore";
import ConnectButton from "./ConnectButton";
import NotificationPopup from "./NotificationPopup";

import { ReactComponent as Logo } from "../assets/images/kangal-logo.svg";
import { ReactComponent as Logotype } from "../assets/images/kangal-logotype.svg";

export default function Navigation() {
  const location = useLocation();
  const stakeStore = useStakeStore();
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    stakeStore.pendingTx ? setPlayState(true) : setPlayState(false);
  }, [stakeStore.pendingTx]);

  return (
    <div>
      <div className="flex relative z-10 h-20 px-4 sm:px-10 items-center bg-darkBlue">
        <div className="flex h-8">
          <Logo className="w-8 h-8" />
          <Logotype className="ml-2 mt-2" />
        </div>
        <nav className="hidden sm:block absolute-center">
          <ul className="flex justify-center space-x-4">
            <li className="">
              <Link to="/">
                <div
                  className={
                    "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-xl " +
                    (location.pathname === "/" ? "glow" : "")
                  }
                >
                  Stake
                </div>
              </Link>
            </li>
            <li className="">
              <Link to="/bridge">
                <div
                  className={
                    "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-xl " +
                    (location.pathname === "/bridge" ? "glow" : "")
                  }
                >
                  Bridge
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>

      {/* Nav on mobile */}
      <nav className="sm:hidden flex-1 bg-darkBlue overflow-hidden">
        <ul className="flex justify-center space-x-4">
          <li className="">
            <Link to="/">
              <div
                className={
                  "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-xl " +
                  (location.pathname === "/" ? "glow" : "")
                }
              >
                Stake
              </div>
            </Link>
          </li>
          <li className="">
            <Link to="/bridge">
              <div
                className={
                  "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-xl " +
                  (location.pathname === "/bridge" ? "glow" : "")
                }
              >
                Bridge
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sticky top-0 z-10">
        <NotificationPopup
          playState={playState}
          transaction={stakeStore.pendingTx}
        />
      </div>
    </div>
  );
}
