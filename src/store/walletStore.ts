import { ethers } from "ethers";
import Web3Modal from "web3modal";
import create from "zustand";

import useStakeStore from "./tokenStore";

export type Network = {
  name: string;
  chainId: number;
  networkExplorerName: string;
  networkExporerUrl: string;
};

const bsc: Network = {
  name: "BSC",
  chainId: 56,
  networkExplorerName: "Bscscan",
  networkExporerUrl: "https://bscscan.com/",
};
const polygon: Network = {
  name: "Polygon",
  chainId: 137,
  networkExplorerName: "Polygonscan",
  networkExporerUrl: "https://polygonscan.com/",
};

type WalletStore = {
  hasMetamask: boolean;
  hasPendingConnect: boolean;
  requiredNetwork: Network;
  networkOptions: Network[];
  provider: ethers.providers.Web3Provider | null;
  address: string | null;
  networkWarning: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  changeRequiredNetwork: (network: Network) => Promise<void>;
  onNetworkChange: (chainId: number) => Promise<void>;
};

const useWalletStore = create<WalletStore>((set, get) => ({
  hasMetamask: false,
  hasPendingConnect: true,
  requiredNetwork: getRequiredNetwork(),
  networkOptions: [bsc, polygon],
  provider: null,
  address: null,
  networkWarning: null,
  connect: async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const address = await provider.getSigner().getAddress();

      set({
        provider: provider,
        address: address,
        hasPendingConnect: false,
        networkWarning: null,
      });
    } catch (error) {
      console.log(error);
      set({ hasPendingConnect: false });
    }
  },
  disconnect: () => {
    web3Modal.clearCachedProvider();
    set({ provider: null, address: null });
  },
  changeRequiredNetwork: async (network: Network) => {
    set({ requiredNetwork: network });
    localStorage.setItem("requiredNetwork", network.name);
    set((state) => {
      state.hasPendingConnect = false;
      state.networkWarning = `Please switch network to ${state.requiredNetwork.name}`;
    });
    try {
      await useStakeStore.getState().onNetworkChange(network.name);
      try {
        await window.ethereum.request(
          get().requiredNetwork.chainId === 56
            ? bscNetworkInfo
            : polygonNetworkInfo
        );
        get().connect();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  },
  onNetworkChange: async (chainId: number) => {
    if (get().requiredNetwork.chainId !== chainId) {
      set((state) => {
        state.hasPendingConnect = false;
        state.networkWarning = `Please switch network to ${state.requiredNetwork.name}`;
      });

      try {
        await window.ethereum.request(
          get().requiredNetwork.chainId === 56
            ? bscNetworkInfo
            : polygonNetworkInfo
        );
        get().connect();
      } catch (error) {
        console.log(error);
      }
    } else {
      get().connect();
    }
  },
}));

function getRequiredNetwork(): Network {
  const savedItem = localStorage.getItem("requiredNetwork");

  if (savedItem === "Polygon") {
    return polygon;
  }

  return bsc;
}

const providerOptions = {};
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

if (window.ethereum) {
  const windowProvider = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );
  useWalletStore.setState({
    hasMetamask: true,
  });
  windowProvider.on("network", (newNetwork, _) => {
    useWalletStore.getState().onNetworkChange(newNetwork.chainId);
  });
  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    if (accounts.length > 0) {
      useWalletStore.getState().connect();
    } else {
      useWalletStore.getState().disconnect();
    }
  });
} else {
  web3Modal.clearCachedProvider();
  useWalletStore.setState({
    hasMetamask: false,
    hasPendingConnect: false,
    networkWarning:
      "Use Metamask in-app browser or Metamask extenstion to connect your wallet",
  });
}

const bscNetworkInfo = {
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: "0x38",
      chainName: "BSC Mainnet",
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  ],
};

const polygonNetworkInfo = {
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: "0x89",
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "Polygon",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mainnet.matic.network"],
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  ],
};

export default useWalletStore;
