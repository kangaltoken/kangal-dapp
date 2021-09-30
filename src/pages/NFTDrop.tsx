import ReactPlayer from "react-player/lazy";

interface NFTDropProps {
  assetUrl: string;
}

export default function NFTDrop() {
  return (
    <>
      <div className="container mx-auto px-4 pb-10">
        <div className="mt-10">
          <h1 className="text-white text-4xl font-bold text-center">
            Kang Gang 001
          </h1>
        </div>

        <div className="mt-10 flex-row md:flex md:space-x-28">
          <div className="md:max-w-md lg:max-w-lg">
            <div>
              <ReactPlayer
                url="https://gateway.pinata.cloud/ipfs/QmdGsaQ6h7oFpTxXxd4FimxrRSqokJJtJvNaFS3tYjq17i"
                playing
                loop
                width="100%"
                height="100%"
              />
            </div>
            <div className="space-y-4 mt-12">
              <div className=" flex">
                <div className="text-white text-md flex-1">
                  Contract address
                </div>
                <div className="text-white text-md text-right border-b">
                  0xgFsd...0000
                </div>
              </div>

              <div className=" flex">
                <div className="text-white text-md flex-1">Token ID</div>
                <div className="text-white text-md text-right border-b">1</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-white text-xl">Current Top Bid</div>
              <div className="text-white text-xl font-bold">1M $TEAK</div>
              <div className="text-white text-sm font-bold">
                by 0xgFsd...0000
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-white text-xl">Auction ends in</div>
              <div className="text-white text-xl font-bold">
                6 days 11 hours
              </div>
            </div>
            <div>
              <div className="flex-col mt-32 sm:max-w-xs">
                <div className="flex">
                  <div className="flex-1">
                    <input
                      className="p-2 w-full text-white bg-transparent"
                      type="text"
                      placeholder="0 $TEAK"
                      onChange={(e) => {
                        const regexp = /^-?\d*\.?\d*$/;
                        const value = e.target.value;
                        if (regexp.test(value) || "" === value) {
                          //setDepositAmount(e.target.value);
                        }
                      }}
                    />
                    <div className="h-px bg-body" />
                  </div>
                </div>
                <p className="mt-2 text-xs">Operation fee: 0.0002 BNB</p>
              </div>
              <button className="flex relative" onClick={() => {}}>
                <div className="absolute w-full h-full bg-white rounded-md opacity-10" />
                <p className="text-white px-6 py-2 font-semibold tracking-wider">
                  Add your bid
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
