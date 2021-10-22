import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import useAuctionStore, { AuctionStore } from "../store/auctionStore";
import useWalletStore from "../store/walletStore";
import { formatAmount, shrinkAddress } from "../utils/Formatters";
import ReactTooltip from "react-tooltip";
import useInterval from "../utils/useInterval";
import { ethers } from "ethers";

export default function NFTDrop() {
  const auctionStore = useAuctionStore();
  const walletStore = useWalletStore();

  const playerRef = useRef<any>();
  const [isVideoReady, isVideoReadySet] = useState(false);

  const [bidAmount, setBidAmount] = useState("");

  const showBidControls =
    !auctionStore.hasAuctionEnded ||
    (auctionStore.hasAuctionEnded &&
      auctionStore.lastBidderAddress === walletStore.address &&
      !auctionStore.hasAuctionBeenClaimed);

  const approve = () => {
    if (walletStore.provider && walletStore.address) {
      auctionStore.approveSteak(walletStore.provider);
    }
  };

  const bid = async (amount: string) => {
    if (walletStore.provider && walletStore.address) {
      auctionStore.bid(amount, walletStore.provider);
    }
  };

  const claim = async () => {
    if (walletStore.provider && walletStore.address) {
      auctionStore.claim(walletStore.provider);
    }
  };

  useEffect(() => {
    if (walletStore.provider && walletStore.address) {
      auctionStore.fetchInfo(walletStore.provider, walletStore.address, 3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletStore.provider, walletStore.address]);

  useInterval(() => {
    if (
      walletStore.provider &&
      walletStore.address &&
      walletStore.requiredNetwork.name === "Polygon"
    ) {
      auctionStore.fetchInfo(walletStore.provider, walletStore.address, 3);
    }
  }, 5000);

  if (walletStore.requiredNetwork.name !== "Polygon") {
    return (
      <div className="mt-12 px-4 flex">
        <div
          className="mx-auto shadow-sm px-3 py-2 rounded text-white"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          Please change network to Polygon Mainnet.
        </div>
      </div>
    );
  }

  return (
    <>
      <ReactTooltip effect="solid" multiline={true} />
      <div className="container mx-auto px-4 pb-10">
        <div className="mt-10">
          <h1 className="text-white text-4xl font-bold text-center">
            Kang Gang 001
          </h1>
        </div>

        <div className="mt-10 flex-row md:flex md:space-x-28">
          <div className="w-full md:max-w-md lg:max-w-lg">
            <div className="flex">
              <div
                style={{
                  width: isVideoReady ? "100%" : "0",
                  height: isVideoReady ? "100%" : 0,
                }}
              >
                <ReactPlayer
                  ref={playerRef}
                  url="https://ipfs.io/ipfs/QmdGsaQ6h7oFpTxXxd4FimxrRSqokJJtJvNaFS3tYjq17i"
                  playing
                  loop
                  muted
                  width="100%"
                  height="100%"
                  onReady={() => {
                    isVideoReadySet(true);
                  }}
                />
              </div>
              {!isVideoReady && (
                <img
                  src="https://ipfs.io/ipfs/QmVygN2po7yqa4P8f8YJ18cxnXbxNGGRAET98eJC7iKtMn"
                  alt="kang gang preview"
                />
              )}
            </div>
            <div className="space-y-4 mt-12">
              <div className=" flex">
                <div className="text-white text-md flex-1">
                  Contract address
                </div>
                <div className="text-white text-md text-right border-b">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://polygonscan.com/address/${auctionStore.nftAddress}`}
                  >
                    {auctionStore.nftAddress
                      ? shrinkAddress(auctionStore.nftAddress)
                      : "..."}
                  </a>
                </div>
              </div>

              <div className="flex pb-12 md:pb-0">
                <div className="text-white text-md flex-1">Token ID</div>
                <div className="text-white text-md text-right border-b">1</div>
              </div>
            </div>
          </div>

          {!auctionStore.hasAuctionStarted && (
            <div className="space-y-2">
              <div className="text-white text-xl">Auction starts in</div>
              <div className="text-white text-xl font-bold">
                {/* 6 days 11 hours */}
                {auctionStore.startDate
                  ? calculateRemainingTime(new Date(), auctionStore.startDate)
                  : "..."}
              </div>
              <div className="text-white text-sm font-bold">
                {auctionStore.startDate && formatDate(auctionStore.startDate)}
              </div>
            </div>
          )}

          {auctionStore.hasAuctionStarted && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-white text-xl">
                  {auctionStore.hasAuctionEnded
                    ? "Winner bid"
                    : "Current Top Bid"}
                </div>
                <div className="text-white text-xl font-bold">
                  {auctionStore.lastPrice
                    ? formatAmount(auctionStore.lastPrice, 2, true)
                    : "..."}{" "}
                  $TEAK
                </div>
                <div
                  data-tip={
                    auctionStore.isLastBidUserBid === true
                      ? "Your wallet 🐶"
                      : ""
                  }
                  className={
                    "text-white text-sm font-bold " +
                    (auctionStore.isLastBidUserBid ? "text-purple-400" : "")
                  }
                >
                  by{" "}
                  {auctionStore.lastBidderAddress
                    ? shrinkAddress(auctionStore.lastBidderAddress)
                    : "..."}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-white text-xl">
                  {auctionStore.hasAuctionEnded
                    ? "Auction ended"
                    : "Auction ends in"}
                </div>
                <div className="text-white text-xl font-bold">
                  {/* 6 days 11 hours */}
                  {auctionStore.endDate
                    ? calculateRemainingTime(new Date(), auctionStore.endDate)
                    : "..."}
                </div>
                <div className="text-white text-sm font-bold">
                  {auctionStore.endDate && formatDate(auctionStore.endDate)}
                </div>
              </div>

              {auctionStore.hasAuctionBeenClaimed &&
                auctionStore.lastBidderAddress === walletStore.address && (
                  <div className="text-white text-xl">
                    🎉🥳🍾
                    <br />
                    Congrats! You now own Kang Gang 001!
                    <br />
                    The NFT has been sent to your wallet.
                  </div>
                )}

              {showBidControls && (
                <div>
                  {!auctionStore.hasAuctionEnded && (
                    <div className="flex-col mt-12 md:mt-32 sm:max-w-xs">
                      <div className="flex">
                        <div className="flex-1">
                          <input
                            className="p-2 w-full text-white bg-transparent"
                            type="text"
                            placeholder="0 $TEAK"
                            value={bidAmount}
                            onChange={(e) => {
                              const regexp = /^-?\d*\.?\d*$/;
                              const value = e.target.value;
                              if (regexp.test(value) || "" === value) {
                                setBidAmount(e.target.value);
                              }
                            }}
                          />
                          <div className="h-px bg-body" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex-col sm:max-w-xs">
                      {auctionStore.hasAllowance &&
                        !auctionStore.hasAuctionEnded && (
                          <div className="flex mt-4">
                            <button
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                              }}
                              className="rounded-md text-white px-1 pt-px"
                              onClick={() => {
                                if (auctionStore.lastPrice) {
                                  const amount = ethers.utils
                                    .formatUnits(
                                      auctionStore.lastPrice.add(
                                        auctionStore.lastPrice
                                          .div(1000)
                                          .mul(100)
                                      )
                                    )
                                    .replace(",", ".");
                                  setBidAmount(amount);
                                }
                              }}
                            >
                              +10%
                            </button>
                            <button
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                              }}
                              className="ml-2 rounded-md text-white px-1 pt-px"
                              onClick={() => {
                                if (auctionStore.lastPrice) {
                                  const amount = ethers.utils
                                    .formatUnits(
                                      auctionStore.lastPrice.add(
                                        auctionStore.lastPrice
                                          .div(1000)
                                          .mul(500)
                                      )
                                    )
                                    .replace(",", ".");
                                  setBidAmount(amount);
                                }
                              }}
                            >
                              +50%
                            </button>
                            <button
                              style={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                              }}
                              className="ml-2 rounded-md text-white px-1 pt-px"
                              onClick={() => {
                                if (auctionStore.lastPrice) {
                                  const amount = ethers.utils
                                    .formatUnits(
                                      auctionStore.lastPrice.add(
                                        auctionStore.lastPrice
                                      )
                                    )
                                    .replace(",", ".");
                                  setBidAmount(amount);
                                }
                              }}
                            >
                              +100%
                            </button>
                          </div>
                        )}
                    </div>
                    <button
                      className={
                        "flex relative mt-4" +
                        (auctionStore.hasAuctionEnded ? " mt-10" : "")
                      }
                      onClick={() => {
                        if (
                          auctionStore.hasAuctionEnded &&
                          auctionStore.lastBidderAddress === walletStore.address
                        ) {
                          claim();
                        }
                        if (
                          auctionStore.lastBidderAddress === walletStore.address
                        ) {
                          return;
                        }
                        if (auctionStore.steakBalance?.eq(0)) {
                          return;
                        }
                        if (auctionStore.hasAllowance !== null) {
                          auctionStore.hasAllowance
                            ? bid(bidAmount)
                            : approve();
                        }
                      }}
                    >
                      <div className="absolute w-full h-full bg-white rounded-md opacity-10" />
                      <p className="text-white px-6 py-2 font-semibold tracking-wider">
                        {makeBidButtonText(auctionStore, walletStore.address)}
                      </p>
                    </button>
                    <p className="mt-4 text-xs text-white leading-5 w-64">
                      - Minimum bid increase is +10000 $TEAK.
                      <br />- 1% of replaced bids are burned and rest are
                      returned to replaced bidder. <br /> - 100% of winner bid
                      will be burned. <br /> - End time will be extended 5
                      minutes if there is a new bid in less than 5 minutes
                      remaining auction to end.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-12 pb-4 px-4 flex">
        <div
          className="mx-auto shadow-sm px-3 py-2 rounded text-white"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          Using Smart Contracts, Tokens, and Crypto is always a risk. DYOR
          before investing.
        </div>
      </div>
    </>
  );
}

const calculateRemainingTime = (startDate: Date, endDate: Date): string => {
  // + 60: 1 min offset
  const remainingSeconds =
    (endDate.getTime() - startDate.getTime()) / 1000 + 60;
  const days = remainingSeconds / (60 * 60 * 24);
  const hours = (remainingSeconds % (60 * 60 * 24)) / (60 * 60);
  const minutes = (remainingSeconds % (60 * 60)) / 60;
  // const seconds = (remainingSeconds % (60 * 60 * 24)) % 60;

  const daysString: string =
    Math.floor(days) > 0
      ? `${Math.floor(days)} day${days > 1 ? "s" : ""}, `
      : "";

  const hoursString: string =
    Math.floor(hours) > 0
      ? `${Math.floor(hours)} hour${hours > 1 ? "s" : ""}, `
      : "";

  const minutesString: string =
    Math.floor(minutes) > 0
      ? `${Math.floor(minutes)} minute${minutes > 1 ? "s" : ""}`
      : "";

  return `${daysString}${hoursString}${minutesString}`;
};

const formatDate = (date: Date): string => {
  var options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    month: "long",
    day: "numeric",
  };
  return "on " + date.toLocaleDateString("en-US", options);
};

function makeBidButtonText(
  auctionStore: AuctionStore,
  userAddress: string | null
): string {
  if (auctionStore.hasAuctionBeenClaimed) {
    return "";
  }
  if (
    auctionStore.hasAuctionEnded &&
    auctionStore.lastBidderAddress === userAddress
  ) {
    return "CLAIM";
  }
  if (auctionStore.steakBalance?.eq(0)) {
    return "NO BALANCE";
  }
  if (auctionStore.lastBidderAddress === userAddress)
    return "You have the top bid";
  return auctionStore.hasAllowance == null
    ? "..."
    : auctionStore.hasAllowance
    ? "Add your bid"
    : "Enable bidding";
}
