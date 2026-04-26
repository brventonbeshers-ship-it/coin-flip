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
// rep-sdk-index: 1776315927772
// rep-sdk-index: 1776350072670
// rep-sdk-index: 1776373019425
// rep-sdk-index: 1776401448975
// rep-sdk-index: 1776432035522
// rep-sdk-index: 1776460787727
// rep-sdk-index: 1776480502369
// rep-sdk-index: 1776494530541
// rep-sdk-index: 1776518961207
// rep-sdk-index: 1776550571001
// rep-sdk-index: 1776586155948
// rep-sdk-index: 1776620068321
// rep-sdk-index: 1776644980818
// rep-sdk-index: 1776672960846
// rep-sdk-index: 1776680193862
// rep-sdk-index: 1776702122292
// rep-sdk-index: 1776752313729
// rep-sdk-index: 1776781893220
// rep-sdk-index: 1776804991724
// rep-sdk-index: 1776818026656
// rep-sdk-index: 1776835011098
// rep-sdk-index: 1776863750979
// rep-sdk-index: 1776876975655
// rep-sdk-index: 1776890475838
// rep-sdk-index: 1776939642059
// rep-sdk-index: 1776962925038
// rep-sdk-index: 1777001995657
// rep-sdk-index: 1777025420358
// rep-sdk-index: 1777038028721
// rep-sdk-index: 1777067212422
// rep-sdk-index: 1777104022608
// rep-sdk-index: 1777119976738
// rep-sdk-index: 1777169772640
// rep-sdk-index: 1777184726462
