import { useCallback, useState, useMemo, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "9f0c48b0a30441c8b0f736595f426577",
    },
  },
};

function useWeb3Modal() {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    async function getNetwork() {
      let network = await provider?.detectNetwork();
      console.log(network);
    }
    getNetwork();
  }, [provider]);

  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        cacheProvider: true,
        providerOptions,
      }),
    []
  );

  const login = useCallback(async () => {
    const web3Provider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3Provider);
    setProvider(provider);
  }, [web3Modal]);

  function logout() {
    setProvider(null);
    web3Modal.clearCachedProvider();
  }

  return { provider: provider, login: login, logout: logout };
}

export default useWeb3Modal;
