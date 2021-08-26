import { ethers, BigNumber } from "ethers";

import { ERC20__factory } from "../assets/typechain/factories/ERC20__factory";

import Addresses from "../constants/contracts";

// This is for single use on Bridge page to be able to show balances on both chains
export default async function steakBalancePolygon(
  userAddress: string
): Promise<BigNumber> {
  const polygonProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mainnet.matic.network"
  );
  const steak = ERC20__factory.connect(
    Addresses.polygonMainnet.teak,
    polygonProvider
  );
  const sBalance = await steak.balanceOf(userAddress);
  return sBalance;
}
