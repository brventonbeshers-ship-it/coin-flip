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
// rep-sdk-types: 1776672964080
// rep-sdk-types: 1776680197105
// rep-sdk-types: 1776702118044
// rep-sdk-types: 1776752496965
// rep-sdk-types: 1776781722987
// rep-sdk-types: 1776805212475
// rep-sdk-types: 1776818220127
// rep-sdk-types: 1776834938596
// rep-sdk-types: 1776863877977
// rep-sdk-types: 1776877041523
// rep-sdk-types: 1776890470574
// rep-sdk-types: 1776939803528
// rep-sdk-types: 1776962907008
// rep-sdk-types: 1777002119407
// rep-sdk-types: 1777025497987
// rep-sdk-types: 1777037848947
// rep-sdk-types: 1777067178028
// rep-sdk-types: 1777103912205
// rep-sdk-types: 1777119972232
// rep-sdk-types: 1777194893317
// rep-sdk-types: 1777215333540
// rep-sdk-types: 1777238140578
// rep-sdk-types: 1777266583668
// rep-sdk-types: 1777279245186
// rep-sdk-types: 1777329329025
// rep-sdk-types: 1777356937753
// rep-sdk-types: 1777448403482
// rep-sdk-types: 1777614056677
// rep-sdk-types: 1777720849268
// rep-sdk-types: 1777756841091
// rep-sdk-types: 1777799248527
// rep-sdk-types: 1777881033445
