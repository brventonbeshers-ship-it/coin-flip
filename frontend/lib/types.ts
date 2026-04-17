export interface LeaderEntry {
  who: string;
  flips: number;
}

export interface WalletState {
  address: string | null;
  connected: boolean;
}

export interface GameStats {
  totalFlips: number;
  userFlips: number;
  lastSide: number;
  leaderboard: LeaderEntry[];
}
// rep-types-lib: 1775871672482
// rep-types-lib: 1775920651287
// rep-types-lib: 1775966869828
// rep-types-lib: 1776046854948
// rep-types-lib: 1776063185016
// rep-types-lib: 1776084375817
// rep-types-lib: 1776116528207
// rep-types-lib: 1776144191066
// rep-types-lib: 1776171131612
// rep-types-lib: 1776186694337
// rep-types-lib: 1776215659813
// rep-types-lib: 1776248219953
// rep-types-lib: 1776256803769
// rep-types-lib: 1776316190449
// rep-types-lib: 1776331553562
// rep-types-lib: 1776350030899
// rep-types-lib: 1776373147908
// rep-types-lib: 1776401352937
// rep-types-lib: 1776432105869
// rep-types-lib: 1776460919116
