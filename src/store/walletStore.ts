import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import create from "zustand";

type Network = {
  name: string;
  chainId: number;
};

type WalletStore = {
  hasMetamask: boolean;
  hasPendingConnect: boolean;
  requiredNetwork: Network;
  provider: ethers.providers.Web3Provider | null;
  address: string | null;
  networkWarning: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const useWalletStore = create<WalletStore>((set, get) => ({
  hasMetamask: false,
  hasPendingConnect: true,
  requiredNetwork: { name: "Binance Smart Chain", chainId: 4 }, // TODO: update id to 56
  provider: null,
  address: null,
  networkWarning: null,
  connect: async () => {
    try {
      const web3Provider = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3Provider);
      const chainId = (await provider.getNetwork()).chainId;
      const address = await provider.getSigner().getAddress();

      if (!get().hasMetamask && get().requiredNetwork.chainId !== chainId) {
        set({
          provider: null,
          address: null,
          hasPendingConnect: false,
          networkWarning: `Please switch network to ${
            get().requiredNetwork.name
          } and reset WalletConnect session`,
        });
      } else {
        set({
          provider: provider,
          address: address,
          hasPendingConnect: false,
          networkWarning: null,
        });
      }
    } catch (error) {
      console.log(error);
      set({ hasPendingConnect: false });
    }
  },
  disconnect: () => {
    web3Modal.clearCachedProvider();
    set({ provider: null, address: null });
  },
}));

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "9f0c48b0a30441c8b0f736595f426577",
    },
  },
};
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
    let state = useWalletStore.getState();

    if (newNetwork.chainId !== state.requiredNetwork.chainId) {
      useWalletStore.setState({
        hasPendingConnect: false,
        networkWarning: `Please switch network to ${state.requiredNetwork.name}`,
      });
    } else {
      state.connect();
    }
  });
  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    if (accounts.length > 0) {
      useWalletStore.getState().connect();
    } else {
      useWalletStore.getState().disconnect();
    }
  });
} else {
  useWalletStore.setState({
    hasMetamask: false,
    hasPendingConnect: false,
  });
}

export default useWalletStore;
