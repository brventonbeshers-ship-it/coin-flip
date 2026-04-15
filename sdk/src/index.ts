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
// rep-sdk-index: 1776047057559
// rep-sdk-index: 1776063267164
// rep-sdk-index: 1776084427423
// rep-sdk-index: 1776116376173
// rep-sdk-index: 1776144035184
// rep-sdk-index: 1776171202936
// rep-sdk-index: 1776186497114
// rep-sdk-index: 1776215535528
// rep-sdk-index: 1776247985050
// rep-sdk-index: 1776256798576
// rep-sdk-index: 1776270146081
