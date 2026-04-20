import type { StacksNetwork } from "@stacks/network";
import type { PostConditionMode } from "@stacks/transactions";

export interface CoinFlipConfig {
  contractAddress?: string;
  contractName?: string;
  apiBase?: string;
  network?: StacksNetwork;
}

export interface LeaderEntry {
  who: string;
  flips: number;
}

export interface ReadOnlyResponse {
  okay?: boolean;
  result?: string;
  cause?: string;
}

export interface FlipCall {
  contractAddress: string;
  contractName: string;
  functionName: "flip";
  functionArgs: [];
  postConditionMode: PostConditionMode;
  postConditions: [];
  network: StacksNetwork;
}
// rep-sdk-types: 1775871730535
// rep-sdk-types: 1775920680628
// rep-sdk-types: 1775967007568
// rep-sdk-types: 1776047114639
// rep-sdk-types: 1776063148541
// rep-sdk-types: 1776084537955
// rep-sdk-types: 1776116407901
// rep-sdk-types: 1776144275022
// rep-sdk-types: 1776171186196
// rep-sdk-types: 1776186440766
// rep-sdk-types: 1776215598640
// rep-sdk-types: 1776256702384
// rep-sdk-types: 1776315994433
// rep-sdk-types: 1776331460673
// rep-sdk-types: 1776350176854
// rep-sdk-types: 1776373029796
// rep-sdk-types: 1776401513210
// rep-sdk-types: 1776432037710
// rep-sdk-types: 1776460808671
// rep-sdk-types: 1776480561635
// rep-sdk-types: 1776494490485
// rep-sdk-types: 1776519098596
// rep-sdk-types: 1776550478870
// rep-sdk-types: 1776586083589
// rep-sdk-types: 1776619893586
// rep-sdk-types: 1776644971061
