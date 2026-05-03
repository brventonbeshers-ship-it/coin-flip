import { STACKS_MAINNET } from "@stacks/network";
import {
  PostConditionMode,
  cvToValue,
  hexToCV,
  principalCV,
  serializeCV,
} from "@stacks/transactions";
import type {
  CoinFlipConfig,
  LeaderEntry,
  ReadOnlyResponse,
  FlipCall,
} from "./types";

export const DEFAULT_CONFIG: Required<CoinFlipConfig> = {
  contractAddress: "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM",
  contractName: "coin-flip",
  apiBase: "https://api.mainnet.hiro.so",
  network: STACKS_MAINNET,
};

function resolveConfig(overrides: CoinFlipConfig = {}): Required<CoinFlipConfig> {
  return { ...DEFAULT_CONFIG, ...overrides };
}

function serializeCvToHex(cv: unknown): string {
  const serialized = serializeCV(cv as never);
  if (typeof serialized === "string") {
    return serialized.startsWith("0x") ? serialized : `0x${serialized}`;
  }
  return `0x${Buffer.from(serialized).toString("hex")}`;
}

export async function callReadOnly(
  functionName: string,
  args: string[] = [],
  config: CoinFlipConfig = {}
): Promise<ReadOnlyResponse> {
  const resolved = resolveConfig(config);
  const response = await fetch(
    `${resolved.apiBase}/v2/contracts/call-read/${resolved.contractAddress}/${resolved.contractName}/${functionName}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: resolved.contractAddress,
        arguments: args,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Read-only call failed with status ${response.status}`);
  }

  return response.json() as Promise<ReadOnlyResponse>;
}

function normalizeLeaderboardValue(raw: unknown): LeaderEntry[] {
  const entries = Array.isArray(raw) ? raw : [];

  return entries
    .map(item => {
      const entry =
        item && typeof item === "object" && "value" in item
          ? (item as { value: unknown }).value
          : item;
      const record = entry as {
        who?: { value?: string } | string;
        flips?: { value?: string | number } | string | number;
      };

      return {
        who: String(record?.who && typeof record.who === "object" ? record.who.value ?? "" : record?.who ?? ""),
        flips: Number(
          record?.flips && typeof record.flips === "object"
            ? record.flips.value ?? 0
            : record?.flips ?? 0
        ),
      };
    })
    .filter(entry => entry.who && entry.flips > 0);
}

export async function getTotalFlips(config: CoinFlipConfig = {}): Promise<number> {
  const data = await callReadOnly("get-total-flips", [], config);
  if (!data.okay || !data.result) {
    return 0;
  }

  const clarityValue = hexToCV(data.result);
  const parsed = cvToValue(clarityValue, true) as { value?: unknown } | unknown;
  return Number(
    parsed && typeof parsed === "object" && "value" in parsed
      ? parsed.value ?? 0
      : parsed ?? 0
  );
}

export async function getUserFlips(
  userAddress: string,
  config: CoinFlipConfig = {}
): Promise<number> {
  const principalArg = serializeCvToHex(principalCV(userAddress));
  const data = await callReadOnly("get-user-flips", [principalArg], config);
  if (!data.okay || !data.result) {
    return 0;
  }

  const clarityValue = hexToCV(data.result);
  const parsed = cvToValue(clarityValue, true) as { value?: unknown } | unknown;
  return Number(
    parsed && typeof parsed === "object" && "value" in parsed
      ? parsed.value ?? 0
      : parsed ?? 0
  );
}

export async function getUserLastSide(
  userAddress: string,
  config: CoinFlipConfig = {}
): Promise<number> {
  const principalArg = serializeCvToHex(principalCV(userAddress));
  const data = await callReadOnly("get-user-last-side", [principalArg], config);
  if (!data.okay || !data.result) {
    return 0;
  }

  const clarityValue = hexToCV(data.result);
  const parsed = cvToValue(clarityValue, true) as { value?: unknown } | unknown;
  return Number(
    parsed && typeof parsed === "object" && "value" in parsed
      ? parsed.value ?? 0
      : parsed ?? 0
  );
}

export async function getLeaderboard(
  config: CoinFlipConfig = {}
): Promise<LeaderEntry[]> {
  const data = await callReadOnly("get-leaderboard", [], config);
  if (!data.okay || !data.result) {
    return [];
  }

  const clarityValue = hexToCV(data.result);
  const parsed = cvToValue(clarityValue, true);
  return normalizeLeaderboardValue(parsed);
}

export function createFlipCall(config: CoinFlipConfig = {}): FlipCall {
  const resolved = resolveConfig(config);
  return {
    contractAddress: resolved.contractAddress,
    contractName: resolved.contractName,
    functionName: "flip",
    functionArgs: [],
    postConditionMode: PostConditionMode.Deny,
    postConditions: [],
    network: resolved.network,
  };
}

export class CoinFlipClient {
  private readonly config: Required<CoinFlipConfig>;

  constructor(config: CoinFlipConfig = {}) {
    this.config = resolveConfig(config);
  }

  getTotalFlips(): Promise<number> {
    return getTotalFlips(this.config);
  }

  getUserFlips(userAddress: string): Promise<number> {
    return getUserFlips(userAddress, this.config);
  }

  getUserLastSide(userAddress: string): Promise<number> {
    return getUserLastSide(userAddress, this.config);
  }

  getLeaderboard(): Promise<LeaderEntry[]> {
    return getLeaderboard(this.config);
  }

  createFlipCall(): FlipCall {
    return createFlipCall(this.config);
  }
}
// rep-sdk-client: 1775871624534
// rep-sdk-client: 1775920568425
// rep-sdk-client: 1775967154548
// rep-sdk-client: 1776063361222
// rep-sdk-client: 1776084364267
// rep-sdk-client: 1776116465969
// rep-sdk-client: 1776144125714
// rep-sdk-client: 1776171058419
// rep-sdk-client: 1776186503482
// rep-sdk-client: 1776215586067
// rep-sdk-client: 1776248172369
// rep-sdk-client: 1776256712785
// rep-sdk-client: 1776270103688
// rep-sdk-client: 1776316113438
// rep-sdk-client: 1776331555752
// rep-sdk-client: 1776350269039
// rep-sdk-client: 1776373203495
// rep-sdk-client: 1776401453163
// rep-sdk-client: 1776432113243
// rep-sdk-client: 1776460779350
// rep-sdk-client: 1776480444982
// rep-sdk-client: 1776494394040
// rep-sdk-client: 1776519222293
// rep-sdk-client: 1776550651357
// rep-sdk-client: 1776586197367
// rep-sdk-client: 1776620175114
// rep-sdk-client: 1776645198462
// rep-sdk-client: 1776673035770
// rep-sdk-client: 1776680120254
// rep-sdk-client: 1776702066729
// rep-sdk-client: 1776752577874
// rep-sdk-client: 1776781802338
// rep-sdk-client: 1776805068504
// rep-sdk-client: 1776818268432
// rep-sdk-client: 1776834864096
// rep-sdk-client: 1776863802952
// rep-sdk-client: 1776877143931
// rep-sdk-client: 1776890467305
// rep-sdk-client: 1776939491052
// rep-sdk-client: 1776962966313
// rep-sdk-client: 1777002264464
// rep-sdk-client: 1777025559101
// rep-sdk-client: 1777038031983
// rep-sdk-client: 1777066950697
// rep-sdk-client: 1777103970377
// rep-sdk-client: 1777119991774
// rep-sdk-client: 1777169919472
// rep-sdk-client: 1777184693677
// rep-sdk-client: 1777194930105
// rep-sdk-client: 1777215499653
// rep-sdk-client: 1777238111685
// rep-sdk-client: 1777266642088
// rep-sdk-client: 1777329463288
// rep-sdk-client: 1777356898284
// rep-sdk-client: 1777448401241
// rep-sdk-client: 1777587577465
// rep-sdk-client: 1777613835532
// rep-sdk-client: 1777657642415
// rep-sdk-client: 1777700686443
// rep-sdk-client: 1777757065554
// rep-sdk-client: 1777798997838
