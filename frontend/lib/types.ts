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
