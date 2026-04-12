import type { CoinFlipClient } from "./client";

export {
  CoinFlipClient,
  DEFAULT_CONFIG,
  callReadOnly,
  createFlipCall,
  getLeaderboard,
  getTotalFlips,
  getUserFlips,
  getUserLastSide,
} from "./client";

export type {
  CoinFlipConfig,
  LeaderEntry,
  ReadOnlyResponse,
  FlipCall,
} from "./types";

export type TotalFlipsResult = Awaited<
  ReturnType<CoinFlipClient["getTotalFlips"]>
>;
// rep-sdk-index: 1775871633101
// rep-sdk-index: 1775920806386
// rep-sdk-index: 1775966865635
