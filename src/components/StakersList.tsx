import { BigNumber } from "ethers";
import { ReactComponent as Logo } from "../assets/images/kangal-logo.svg";
import StakersListItem from "./StakersListItem";

export default function StakersList() {
  return (
    <div className="mt-6">
      <div className="py-4 px-6 bg-white shadow-sm rounded-lg">
        <div className="flex space-x-3">
          <div className="font-bold w-8">#</div>
          <div className="flex-1 pl-4 font-bold flex">
            <Logo className="w-5 mr-1 -mt-1" /> Staked
          </div>
          <div className="w-32 font-bold">$TEAK'er</div>
        </div>
      </div>

      <div className="mt-4">
        <StakersListItem
          number={1}
          stakeAmount={BigNumber.from("100100100100100100100100100100")}
          address="0x0000...01234"
        />
      </div>
    </div>
  );
}
