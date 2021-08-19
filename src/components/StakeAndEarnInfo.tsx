import { ReactComponent as KangalLogo } from "../assets/images/kangal-logo.svg";
import { ReactComponent as SteakLogo } from "../assets/images/steak-logo.svg";
import { ReactComponent as KangalLogoBg } from "../assets/images/kangal-bg.svg";
import { ReactComponent as SteakLogoBg } from "../assets/images/steak-bg.svg";
import { ReactComponent as Chevron } from "../assets/images/chevron.svg";
import { useEffect, useState } from "react";

interface IStakeAndEarnInfo {
  aprm: string;
}

export default function StakeAndEarnInfo(props: IStakeAndEarnInfo) {
  const [interestExample, setInterestExample] = useState("300K");

  useEffect(() => {
    const interest = 10 * Number(props.aprm);
    setInterestExample(`${interest}K`);
  }, [props.aprm]);
  return (
    <div className="p-6 shadow-lg">
      <div className="flex items-center">
        <div className="flex-col text-center">
          <div className="relative w-20 sm:w-24 mx-auto">
            <KangalLogoBg />
            <KangalLogo className="w-8 sm:w-11 absolute-center" />
          </div>
          <p className="text-body text-sm font-semibold">
            Stake <br className="block sm:hidden" /> KANGAL
          </p>
        </div>
        <div className="w-10 -mt-10 sm:-mt-5 lg:mx-10">
          <Chevron />
        </div>
        <div className="flex-col text-center mr-2">
          <div className="relative w-20 sm:w-24 mx-auto">
            <SteakLogoBg />
            <SteakLogo className="w-8 sm:w-11 absolute-center" />
          </div>
          <p className="text-body text-sm font-semibold">
            Earn <br className="block sm:hidden" /> $TEAK
          </p>
        </div>

        <div className="flex-col text-center ml-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
            <div className="absolute w-full h-full rounded-2xl bg-green opacity-10" />
            <p className="absolute-center text-green text-xl sm:text-2xl font-semibold">
              {props.aprm}%
            </p>
          </div>
          <p
            data-tip={`This is the yearly mint rate. <br/>
            For example, if you stake 1M KANGAL <br/> 
            you would get ${interestExample} $TEAK in one year.`}
            className="mt-4 text-body text-sm font-semibold underline cursor-help"
          >
            APR-M
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center">
        <p className="text-sm">Withdrawal fee: 0.1% KANGAL</p>
        <div className="h-4 w-px bg-black mx-3 hidden sm:block" />
        <a
          className="text-sm underline mt-2 sm:mt-0"
          target="_blank"
          rel="noreferrer"
          href="https://docs.kangaltoken.com/contracts/addresses"
        >
          Contract Address
        </a>
      </div>
    </div>
  );
}
