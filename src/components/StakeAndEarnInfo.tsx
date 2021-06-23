import { ReactComponent as KangalLogo } from "../assets/images/kangal-logo.svg";
import { ReactComponent as SteakLogo } from "../assets/images/steak-logo.svg";
import { ReactComponent as KangalLogoBg } from "../assets/images/kangal-bg.svg";
import { ReactComponent as SteakLogoBg } from "../assets/images/steak-bg.svg";
import { ReactComponent as Chevron } from "../assets/images/chevron.svg";

export default function StakeAndEarnInfo() {
  return (
    <div className="p-6 shadow-lg">
      <div className="flex items-center">
        <div className="flex-col text-center">
          <div className="relative w-24 mx-auto">
            <KangalLogoBg />
            <KangalLogo className="w-11 absolute-center" />
          </div>
          <p className="text-body text-sm font-semibold">Stake KANGAL</p>
        </div>
        <div className="w-10 -mt-5 lg:mx-10">
          <Chevron />
        </div>
        <div className="flex-col text-center">
          <div className="relative w-24 mx-auto">
            <SteakLogoBg />
            <SteakLogo className="w-11 absolute-center" />
          </div>
          <p className="text-body text-sm font-semibold">Earn $TEAK</p>
        </div>

        <div className="flex-col text-center ml-auto">
          <div className="w-20 h-20 relative">
            <div className="absolute w-full h-full rounded-2xl bg-green opacity-10" />
            <p className="absolute-center text-green text-2xl font-semibold">
              30%
            </p>
          </div>
          <p className="mt-4 text-body text-sm font-semibold">APR-M</p>
        </div>
      </div>
      <p className="mt-5 text-sm">Withdrawal fee: 0.1% KANGAL</p>
    </div>
  );
}
