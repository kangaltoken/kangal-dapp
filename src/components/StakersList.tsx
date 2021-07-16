import { BigNumber } from "ethers";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ReactComponent as Spinner } from "../assets/images/spinner.svg";
import { ReactComponent as Logo } from "../assets/images/kangal-logo.svg";

import StakersListItem from "./StakersListItem";

gsap.registerPlugin(ScrollTrigger);

interface IStakersList {
  userAddress: string;
}

export default function StakersList(props: IStakersList) {
  const [items, setItems] = useState<any[]>([]);

  const revealRefs = useRef<HTMLDivElement[]>([]);
  revealRefs.current = [];
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("cache-control", "no-cache");

    const ms = Date.now();
    fetch(
      "https://kangaltoken.github.io/apis/staking_balances.json" +
        "?dummy=" +
        ms
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);

          setAnimation();
        },
        (error) => {}
      );
  }, []);

  function setAnimation() {
    const windowHeight = window.innerHeight;
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 0.4,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: `top center+=${windowHeight / 2 - 110}`,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  return (
    <div className="mt-6 pb-40">
      <div className="py-4 bg-white shadow-sm rounded-lg">
        <div className="flex">
          <div className="w-14 text-center font-bold">#</div>
          <div className="flex-1 pl-8 font-bold ">$TEAKer</div>
          <div className="w-24 sm:w-40 font-bold flex">
            <Logo className="w-5 h-7 mr-1 -mt-1" /> Staked
          </div>
        </div>
      </div>

      <div className="mt-4 stake-list-item">
        {items.length > 0 ? (
          <div>
            {" "}
            {items.map((item, index) => (
              <div key={index} id={`index-${index}`} ref={addToRefs}>
                <StakersListItem
                  number={index + 1}
                  stakeAmount={BigNumber.from(item[1])}
                  address={item[0]}
                  isUserAddress={
                    props.userAddress.toUpperCase() === item[0].toUpperCase()
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <Spinner className="mx-auto animate-spin h-6 w-6 text-gray-900" />
        )}
      </div>
    </div>
  );
}
