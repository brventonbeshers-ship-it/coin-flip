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
