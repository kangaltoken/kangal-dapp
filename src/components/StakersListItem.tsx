import { BigNumber, utils } from "ethers";
import PatternView from "./PatternView";

interface IStakersListItem {
  number: number;
  stakeAmount: BigNumber;
  address: string;
}

export default function StakersListItem(props: IStakersListItem) {
  return (
    <div className="relative overflow-hidden py-4 px-6 bg-white shadow-sm rounded-lg">
      <PatternView emoji="⭐️" />
      <div className="flex space-x-3">
        <div className="font-bold relative w-8">
          <div className="relative z-10">{props.number}</div>
        </div>
        <div className="flex-1 pl-4 font-bold flex">
          {formatAmount(props.stakeAmount)}
        </div>
        <div className="w-32 font-bold underline">{props.address}</div>
      </div>
    </div>
  );
}

function formatAmount(amount: BigNumber): string {
  const number = parseInt(utils.formatUnits(amount));
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
  return formatted;
}
