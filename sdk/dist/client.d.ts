import type { CoinFlipConfig, LeaderEntry, ReadOnlyResponse, FlipCall } from "./types";
export declare const DEFAULT_CONFIG: Required<CoinFlipConfig>;
export declare function callReadOnly(functionName: string, args?: string[], config?: CoinFlipConfig): Promise<ReadOnlyResponse>;
export declare function getTotalFlips(config?: CoinFlipConfig): Promise<number>;
export declare function getUserFlips(userAddress: string, config?: CoinFlipConfig): Promise<number>;
export declare function getUserLastSide(userAddress: string, config?: CoinFlipConfig): Promise<number>;
export declare function getLeaderboard(config?: CoinFlipConfig): Promise<LeaderEntry[]>;
export declare function createFlipCall(config?: CoinFlipConfig): FlipCall;
export declare class CoinFlipClient {
    private readonly config;
    constructor(config?: CoinFlipConfig);
    getTotalFlips(): Promise<number>;
    getUserFlips(userAddress: string): Promise<number>;
    getUserLastSide(userAddress: string): Promise<number>;
    getLeaderboard(): Promise<LeaderEntry[]>;
    createFlipCall(): FlipCall;
}
