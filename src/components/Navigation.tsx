import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import useTokenStore from "../store/tokenStore";
import ConnectButton from "./ConnectButton";
import NotificationPopup from "./NotificationPopup";

import { ReactComponent as Logo } from "../assets/images/kangal-logo.svg";
import { ReactComponent as Logotype } from "../assets/images/kangal-logotype.svg";
import useAuctionStore from "../store/auctionStore";

export default function Navigation() {
  const location = useLocation();
  const tokenStore = useTokenStore();
  const auctionStore = useAuctionStore();
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    tokenStore.pendingTx ?? auctionStore.pendingTx
      ? setPlayState(true)
      : setPlayState(false);
  }, [tokenStore.pendingTx, auctionStore.pendingTx]);

  return (
    <div>
      <div className="flex relative z-10 h-20 px-4 sm:px-10 items-center bg-black">
        <div className="flex h-8">
          <Logo className="w-8 h-8" />
          <Logotype className="hidden sm:block ml-2 mt-2" />
        </div>
        <nav className="hidden lg:block absolute-center">
          <ul className="flex justify-center space-x-4">
            <li>
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
            <li>
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
            <li>
              <Link to="/nftdrop/kang-gang/2">
                <div
                  className={
                    "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-xl " +
                    (location.pathname.includes("/nftdrop") ? "glow" : "")
                  }
                >
                  NFT Drop
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
      <nav className="lg:hidden flex-1 bg-black overflow-hidden">
        <ul className="flex justify-center space-x-2">
          <li>
            <Link to="/">
              <div
                className={
                  "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-lg " +
                  (location.pathname === "/" ? "glow" : "")
                }
              >
                Stake
              </div>
            </Link>
          </li>
          <li>
            <Link to="/bridge">
              <div
                className={
                  "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-lg " +
                  (location.pathname === "/bridge" ? "glow" : "")
                }
              >
                Bridge
              </div>
            </Link>
          </li>
          <li>
            <Link to="/nftdrop/kang-gang/2">
              <div
                className={
                  "text-white py-2 px-6 rounded-2xl font-semibold tracking-wide text-lg " +
                  (location.pathname.includes("/nftdrop") ? "glow" : "")
                }
              >
                NFT Drop
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sticky top-0 z-10">
        <NotificationPopup
          playState={playState}
          transaction={tokenStore.pendingTx ?? auctionStore.pendingTx}
        />
      </div>
    </div>
  );
}
