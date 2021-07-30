import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useStakeStore from "../store/stakeStore";
import ConnectButton from "./ConnectButton";
import NotificationPopup from "./NotificationPopup";

import { ReactComponent as Logo } from "../assets/images/kangal-logo.svg";
import { ReactComponent as Logotype } from "../assets/images/kangal-logotype.svg";

export default function Navigation() {
  const stakeStore = useStakeStore();
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    stakeStore.pendingTx ? setPlayState(true) : setPlayState(false);
  }, [stakeStore.pendingTx]);

  return (
    <div>
      <div className="flex h-20 px-4 sm:px-10 items-center bg-darkBlue">
        <div className="flex h-8">
          <Logo className="w-8 h-8" />
          <Logotype className="ml-2 mt-2" />
        </div>
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>

      <div className="sticky top-0 z-10">
        <NotificationPopup
          playState={playState}
          transaction={stakeStore.pendingTx}
        />
      </div>
      <nav className="absolute">
        <ul>
          <li>
            <Link to="/test">Test</Link>
          </li>
          <li>
            <Link to="/">Staking</Link>
          </li>
          <li>
            <Link to="/bridge">Bridge</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
