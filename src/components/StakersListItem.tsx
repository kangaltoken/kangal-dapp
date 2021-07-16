import { BigNumber } from "ethers";
import { useMemo } from "react";
import ReactTooltip from "react-tooltip";
import { formatAmount, shrinkAddress } from "../utils/Formatters";
import PatternView from "./PatternView";

interface IStakersListItem {
  number: number;
  stakeAmount: BigNumber;
  address: string;
  isUserAddress: boolean;
}

export default function StakersListItem(props: IStakersListItem) {
  const memoizedEmoji = useMemo(
    () => emojiForNumber(props.number),
    [props.number]
  );

  return (
    <div className="relative mb-2 overflow-hidden py-4 bg-white text-body shadow-sm rounded-lg">
      <ReactTooltip effect="solid" multiline={true} />
      <PatternView emoji={memoizedEmoji} />
      <div className="flex items-center">
        <div className="w-14 text-center z-10 font-bold text-2xl ">
          {props.number}
        </div>

        <div
          data-tip={props.isUserAddress ? "Your wallet 🐶" : ""}
          className={
            "pl-8 font-bold underline " +
            (props.isUserAddress ? "text-green" : "")
          }
        >
          <div className="hidden sm:block">{props.address}</div>
          <div className="block sm:hidden">
            {shrinkAddress(props.address, 4, 4)}
          </div>
        </div>

        <div className="ml-auto w-24 sm:w-40 font-bold pr-4">
          {formatAmount(props.stakeAmount)}
        </div>
      </div>
    </div>
  );
}

function emojiForNumber(number: number): string {
  switch (number) {
    case 1:
      return "🏆";
    case 2:
      return "🥈";
    case 3:
      return "🥉";

    default:
      const defaultEmojis = [
        "💛",
        "🧡",
        "💙",
        "❤️",
        "🐶",
        "🐕",
        "🦮",
        "🐩",
        "🐕‍🦺",
        "🐾",
        "🥩",
        "🦴",
        "🌝",
        "🙈",
        "🐒",
        "🙉",
        "🐵",
        "🦍",
        "🤠",
        "🦧",
        "👀",
        "🥵",
        "😇",
        "😝",
        "🥸",
        "😤",
        "🤗",
        "✊",
        "💅",
        "🙆‍♂️",
        "🙇‍♂️",
        "🙅‍♀️",
        "💆‍♀️",
        "💆",
        "👩‍🌾",
        "👴",
      ];

      return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
  }
}
