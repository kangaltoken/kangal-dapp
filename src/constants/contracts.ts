type KangalAddresses = {
  kangal: string;
  kangalPair: string;
  stablePair: string;
  teak: string;
  staking: string;
  bridge: string | null;
  auction: string | null;
  kangGangNFT: string | null;
};

const addresses: Record<string, KangalAddresses> = {
  bscMainnet: {
    kangal: "0xd632bd021a07af70592ce1e18717ab9aa126decb",
    kangalPair: "0x4E3f77687dd3C61F4e1B919aa4Ded90AE1766894", // KANGAL / wBNB
    stablePair: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16", // wBNB / BUSD
    teak: "0xba0f58179f5441d81d22402bd0183ffff130e243",
    staking: "0x222dc5cbc4d5082ac181532c01a57cc897ea4f15",
    bridge: "0xddafC76669C3aEB46832950f71592aAe68A94FDA",
    auction: null,
    kangGangNFT: null,
  },
  bscTestnet: {
    kangal: "0x6deeceEF046b4fD841919ED970eB4721ce29B927",
    kangalPair: "0x4E3f77687dd3C61F4e1B919aa4Ded90AE1766894",
    stablePair: "",
    teak: "0x666DD33c976d287D28A22d19398D48335A7c3F04",
    staking: "0xE36139b9709B638Bb9DA3c47De823A05EEE3DaB0",
    bridge: null,
    auction: null,
    kangGangNFT: null,
  },
  polygonMainnet: {
    kangal: "0x34f380a4e3389e99c0369264453523bbe5af7fab",
    kangalPair: "0xFA71ECaC520c2074B4dD047D3696c0aeD1b7c3E2", // KANGAL / wETH
    stablePair: "0x34965ba0ac2451A34a0471F04CCa3F990b8dea27", // wETH / USDC
    teak: "0x3d50f9543CdB83ec867F491787C65d14631ba50F",
    staking: "0x68a37C1cbBD49f693029F5749CA0b1D7c6d85A74",
    bridge: null,
    auction: "0x40098B8e8f9DBBaf351E5639A63f241229fE6295",
    kangGangNFT: "0x6e765d26388a17a6e86c49a8e41df3f58abcd337",
  },
  polygonTestnet: {
    kangal: "0x34f380a4e3389e99c0369264453523bbe5af7fab",
    kangalPair: "0xFA71ECaC520c2074B4dD047D3696c0aeD1b7c3E2", // KANGAL / wETH
    stablePair: "0x34965ba0ac2451A34a0471F04CCa3F990b8dea27", // wETH / USDC
    teak: "0xDBD5B39497309655A69ee969230A4D8b44293663",
    staking: "0x68a37C1cbBD49f693029F5749CA0b1D7c6d85A74",
    bridge: null,
    auction: "0xCAa1BBa386FC413c82857A9dDeEBFC6656305695",
    kangGangNFT: null,
  },
};

export default addresses;
