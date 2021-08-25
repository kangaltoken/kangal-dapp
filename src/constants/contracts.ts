type KangalAddresses = {
  kangal: string;
  kangalPair: string;
  stablePair: string;
  teak: string;
  staking: string;
  bridge: string | null;
};

const addresses: Record<string, KangalAddresses> = {
  bscMainnet: {
    kangal: "0xd632bd021a07af70592ce1e18717ab9aa126decb",
    kangalPair: "0x4E3f77687dd3C61F4e1B919aa4Ded90AE1766894", // KANGAL / wBNB
    stablePair: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16", // wBNB / BUSD
    teak: "0xba0f58179f5441d81d22402bd0183ffff130e243",
    staking: "0x222dc5cbc4d5082ac181532c01a57cc897ea4f15",
    bridge: "0xddafC76669C3aEB46832950f71592aAe68A94FDA",
  },
  bscTestnet: {
    kangal: "0x6deeceEF046b4fD841919ED970eB4721ce29B927",
    kangalPair: "0x4E3f77687dd3C61F4e1B919aa4Ded90AE1766894",
    stablePair: "",
    teak: "0x666DD33c976d287D28A22d19398D48335A7c3F04",
    staking: "0xE36139b9709B638Bb9DA3c47De823A05EEE3DaB0",
    bridge: null,
  },
  polygonMainnet: {
    kangal: "0x34f380a4e3389e99c0369264453523bbe5af7fab",
    kangalPair: "0xFA71ECaC520c2074B4dD047D3696c0aeD1b7c3E2", // KANGAL / wETH
    stablePair: "0xE62Ec2e799305E0D367b0Cc3ee2CdA135bF89816", // wETH / USDC
    teak: "0x3d50f9543CdB83ec867F491787C65d14631ba50F",
    staking: "0x68a37C1cbBD49f693029F5749CA0b1D7c6d85A74",
    bridge: null,
  },
};

export default addresses;
