import {
  createFlipCall,
  getLeaderboard as getCoinFlipLeaderboard,
  getTotalFlips as getCoinFlipTotalFlips,
  getUserFlips as getCoinFlipUserFlips,
  getUserLastSide as getCoinFlipUserLastSide,
} from "coin-flip-sdk";

export const CONTRACT_ADDRESS = "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM";
export const CONTRACT_NAME = "coin-flip";
export const API_BASE = "https://api.mainnet.hiro.so";

const COIN_FLIP_CONFIG = {
  contractAddress: CONTRACT_ADDRESS,
  contractName: CONTRACT_NAME,
  apiBase: API_BASE,
};

export type { LeaderEntry } from "coin-flip-sdk";

export async function connectWallet(
  onFinish: (addresses: { stacks: string }) => void
) {
  const { showConnect } = await import("@stacks/connect");
  showConnect({
    appDetails: {
      name: "Coin Flip",
      icon: "/icon.png",
    },
    onFinish: (data: any) => {
      const stacks = data.authResponsePayload?.profile?.stxAddress?.mainnet;
      if (stacks) {
        onFinish({ stacks });
      }
    },
    onCancel: () => {},
  });
}

export const getTotalFlips = () => getCoinFlipTotalFlips(COIN_FLIP_CONFIG);
export const getUserFlips = (userAddress: string) =>
  getCoinFlipUserFlips(userAddress, COIN_FLIP_CONFIG);
export const getUserLastSide = (userAddress: string) =>
  getCoinFlipUserLastSide(userAddress, COIN_FLIP_CONFIG);
export const getLeaderboard = () => getCoinFlipLeaderboard(COIN_FLIP_CONFIG);

export const fetchTotalFlips = getTotalFlips;
export const fetchUserFlips = getUserFlips;
export const fetchUserLastSide = getUserLastSide;
export const fetchLeaderboard = getLeaderboard;

export async function sendFlip(_senderAddress: string) {
  const { openContractCall } = await import("@stacks/connect");
  const args = createFlipCall(COIN_FLIP_CONFIG);

  return new Promise<boolean>((resolve) => {
    openContractCall({
      ...args,
      onFinish: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}
// rep-stacks-lib: 1775871835783
// rep-stacks-lib: 1775920734850
// rep-stacks-lib: 1775966961409
// rep-stacks-lib: 1776046907675
// rep-stacks-lib: 1776063311477
// rep-stacks-lib: 1776084330792
// rep-stacks-lib: 1776116593032
// rep-stacks-lib: 1776144042541
// rep-stacks-lib: 1776170990985
// rep-stacks-lib: 1776186500304
