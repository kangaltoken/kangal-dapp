import { useEffect } from "react";
import { useState } from "react";

import SelectView from "../components/SelectView";

interface Asset {
  name: string;
  uiName: string;
}

const assets: Asset[] = [
  { name: "kangal", uiName: "KANGAL" },
  { name: "steak", uiName: "$TEAK" },
];

interface Chain {
  name: string;
  uiName: string;
}

const chains: Chain[] = [
  { name: "bsc", uiName: "BSC Mainnet" },
  { name: "polygon", uiName: "Polygon Mainnet" },
  { name: "eth", uiName: "Ethereum Mainnet" },
];

export default function Bridge() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(assets[0]);

  const [fromChainOptions, setFromChainOptions] = useState<Chain[]>([]);
  const [toChainOptions, setToChainOptions] = useState<Chain[]>([]);

  const [fromChain, setFromChain] = useState<Chain>(chains[0]);
  const [toChain, setToChain] = useState<Chain>(chains[1]);

  useEffect(() => {
    const [from, to] = chainsForAsset(selectedAsset, fromChain);
    setFromChainOptions(from);
    setToChainOptions(to);
    setToChain(to[0]);
  }, [selectedAsset, fromChain]);

  useEffect(() => {}, [selectedAsset, fromChain, toChain]);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-4 px-4 flex">
        <div className="mx-auto bg-white shadow-sm px-3 py-2 rounded">
          Using Smart Contracts, Tokens, and Crypto is always a risk. DYOR
          before investing.
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-body text-4xl font-bold">Cross-Chain Bridge</h1>
      </div>
      <div className="p-6 mt-4 bg-white rounded-lg shadow-sm">
        <div className="mb-4">
          <div className="font-semibold">Move</div>
          <SelectView
            options={assets.map((value) => {
              return <option value={value.name}>{value.uiName}</option>;
            })}
            value={selectedAsset.name}
            onChange={(value) => {
              const asset = assets.find((el) => {
                return el.name === value;
              });
              if (asset) {
                setSelectedAsset(asset);
              }
            }}
          />
        </div>
        <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-6">
          <div>
            <div className="font-semibold">From</div>
            <SelectView
              options={fromChainOptions.map((value) => {
                return <option value={value.name}>{value.uiName}</option>;
              })}
              value={fromChain.name}
              onChange={(value) => {
                const chain = chains.find((el) => {
                  return el.name === value;
                });
                if (chain) {
                  setFromChain(chain);
                }
              }}
            />
          </div>

          <div>
            <div className="font-semibold">To</div>
            <SelectView
              options={toChainOptions.map((value) => {
                return <option value={value.name}>{value.uiName}</option>;
              })}
              value={toChain.name}
              onChange={(value) => {
                const chain = chains.find((el) => {
                  return el.name === value;
                });
                if (chain) {
                  setToChain(chain);
                }
              }}
            />
          </div>
        </div>
      </div>

      {selectedAsset.name === "kangal" &&
        (fromChain.name === "bsc" || fromChain.name === "eth") &&
        (toChain.name === "bsc" || toChain.name === "eth") && (
          <BurgerSwapInfo from={fromChain.uiName} to={toChain.uiName} />
        )}

      {selectedAsset.name === "kangal" &&
        (fromChain.name === "polygon" || toChain.name === "polygon") && (
          <AnySwapInfo from={fromChain.uiName} to={toChain.uiName} />
        )}

      {selectedAsset.name === "steak" && <SteakBridgeInfo />}
    </div>
  );
}

const BurgerSwapInfo = ({ from, to }: { from: string; to: string }) => (
  <div className="p-6 mt-4 bg-white rounded-lg shadow-sm">
    <p>
      You can use <strong>BurgerSwap bToken bridge</strong> to move your Kangal
      from {from} to {to}
    </p>
    <a
      className="block text-blue-700 underline mt-4"
      target="_blank"
      rel="noreferrer"
      href="https://burgerswap.org/transit"
    >
      Go to BurgerSwap bToken bridge
    </a>
  </div>
);

const AnySwapInfo = ({ from, to }: { from: string; to: string }) => (
  <div className="p-6 mt-4 bg-white rounded-lg shadow-sm">
    <p>
      You can use <strong>AnySwap bridge</strong> to move your Kangal from{" "}
      {from} to {to}
    </p>
    <a
      className="block text-blue-700 underline mt-4"
      target="_blank"
      rel="noreferrer"
      href="https://router.anyswap.exchange/#/swap?bridgetoken=kangal"
    >
      Go to AnySwap bridge
    </a>
  </div>
);

const SteakBridgeInfo = () => (
  <div className="p-6 mt-4 bg-white rounded-lg shadow-sm">
    <p>Coming soon!</p>
  </div>
);

function chainsForAsset(asset: Asset, fromChain: Chain): [Chain[], Chain[]] {
  let fromChains: Chain[] = [];
  let toChains: Chain[] = [];
  if (asset.name === "kangal") {
    fromChains = chains;
    toChains = chains.filter((item) => {
      return fromChain !== item;
    });
  } else {
    fromChains = [chains[0]];
    toChains = [chains[1]];
  }

  return [fromChains, toChains];
}
