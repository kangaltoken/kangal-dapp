import useWalletStore from "../store/walletStore";
import useTokenStore from "../store/tokenStore";

export default function WithdrawTab() {
  const walletStore = useWalletStore();
  const tokenStore = useTokenStore();

  const withdraw = () => {
    if (walletStore.provider) {
      if (!tokenStore.poolInfo.stakedBalance?.eq(0)) {
        tokenStore.withdrawStake(walletStore.provider);
      }
    }
  };

  return (
    <div>
      <div className="mt-2 mx-auto max-w-xs">
        <p className="text-xs">- You will withdraw all of your deposit</p>
        <p className="text-xs">
          - You will be able to claim rewards if you've staked longer than the
          minimum stake time (2 days) since first deposit
        </p>
        <p className="text-xs">- There is a 0.1% KANGAL withdrawal fee</p>
      </div>
      <button className="flex mx-auto mt-6 relative" onClick={withdraw}>
        <div className="absolute w-full h-full bg-orange rounded-md opacity-10" />
        <p className="text-orange px-5 py-1 font-semibold tracking-wider">
          WITHDRAW
        </p>
      </button>
    </div>
  );
}
