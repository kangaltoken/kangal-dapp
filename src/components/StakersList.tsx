import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { ReactComponent as Spinner } from "../assets/images/spinner.svg";
import { ReactComponent as Logo } from "../assets/images/kangal-logo.svg";

import StakersListItem, { IStakersListItem } from "./StakersListItem";
import emojiForNumber from "../utils/EmojiForNumber";

interface IStakersList {
  userAddress: string;
  requiredNetwork: string;
}

export default function StakersList(props: IStakersList) {
  const [allItems, setAllItems] = useState<IStakersListItem[]>([]);

  useEffect(() => {
    let url = "https://kangaltoken.github.io/apis/";
    let api = "staking_balances.json";
    if (props.requiredNetwork === "Polygon") {
      api = "staking_balances_polygon.json";
    }

    const ms = Date.now();
    fetch(`${url}${api}?dummy=${ms}`)
      .then((res) => res.json())
      .then(
        (result: any[]) => {
          const items = result.map((value, index) => {
            const listItemProps: IStakersListItem = {
              number: index + 1,
              stakeAmount: BigNumber.from(value[1]),
              address: value[0],
              isUserAddress:
                props.userAddress.toUpperCase() === value[0].toUpperCase(),
              emoji: emojiForNumber(index + 1),
            };
            return listItemProps;
          });

          setAllItems(items);
        },
        (error) => {}
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  function rowRenderer(rowProps: ListChildComponentProps) {
    return (
      <div
        style={{
          ...rowProps.style,
        }}
      >
        <StakersListItem
          key={rowProps.index}
          number={allItems[rowProps.index].number}
          stakeAmount={allItems[rowProps.index].stakeAmount}
          address={allItems[rowProps.index].address}
          isUserAddress={allItems[rowProps.index].isUserAddress}
          emoji={allItems[rowProps.index].emoji}
        />
      </div>
    );
  }

  return (
    <div className="mt-6 pb-10">
      <div className="py-4 bg-white shadow-sm rounded-lg">
        <div className="flex">
          <div className="w-14 text-center font-bold">#</div>
          <div className="flex-1 pl-8 font-bold ">$TEAKer</div>
          <div className="w-24 sm:w-40 font-bold flex">
            <Logo className="w-5 h-7 mr-1 -mt-1" /> Staked
          </div>
        </div>
      </div>

      <div className="mt-4 stake-list-item flex">
        {allItems.length > 0 ? (
          <div className="w-full rounded overflow-hidden">
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  height={72 * 10 + 30}
                  itemCount={allItems.length}
                  itemSize={72}
                  width={width}
                >
                  {rowRenderer}
                </List>
              )}
            </AutoSizer>
          </div>
        ) : (
          <Spinner className="mx-auto animate-spin h-6 w-6 text-gray-900" />
        )}
      </div>
    </div>
  );
}
