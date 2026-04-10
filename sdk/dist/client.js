"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinFlipClient = exports.DEFAULT_CONFIG = void 0;
exports.callReadOnly = callReadOnly;
exports.getTotalFlips = getTotalFlips;
exports.getUserFlips = getUserFlips;
exports.getUserLastSide = getUserLastSide;
exports.getLeaderboard = getLeaderboard;
exports.createFlipCall = createFlipCall;
const network_1 = require("@stacks/network");
const transactions_1 = require("@stacks/transactions");
exports.DEFAULT_CONFIG = {
    contractAddress: "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM",
    contractName: "coin-flip",
    apiBase: "https://api.mainnet.hiro.so",
    network: network_1.STACKS_MAINNET,
};
function resolveConfig(overrides = {}) {
    return { ...exports.DEFAULT_CONFIG, ...overrides };
}
function serializeCvToHex(cv) {
    const serialized = (0, transactions_1.serializeCV)(cv);
    if (typeof serialized === "string") {
        return serialized.startsWith("0x") ? serialized : `0x${serialized}`;
    }
    return `0x${Buffer.from(serialized).toString("hex")}`;
}
async function callReadOnly(functionName, args = [], config = {}) {
    const resolved = resolveConfig(config);
    const response = await fetch(`${resolved.apiBase}/v2/contracts/call-read/${resolved.contractAddress}/${resolved.contractName}/${functionName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sender: resolved.contractAddress,
            arguments: args,
        }),
    });
    if (!response.ok) {
        throw new Error(`Read-only call failed with status ${response.status}`);
    }
    return response.json();
}
function normalizeLeaderboardValue(raw) {
    const entries = Array.isArray(raw) ? raw : [];
    return entries
        .map(item => {
        const entry = item && typeof item === "object" && "value" in item
            ? item.value
            : item;
        const record = entry;
        return {
            who: String(record?.who && typeof record.who === "object" ? record.who.value ?? "" : record?.who ?? ""),
            flips: Number(record?.flips && typeof record.flips === "object"
                ? record.flips.value ?? 0
                : record?.flips ?? 0),
        };
    })
        .filter(entry => entry.who && entry.flips > 0);
}
async function getTotalFlips(config = {}) {
    const data = await callReadOnly("get-total-flips", [], config);
    if (!data.okay || !data.result) {
        return 0;
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return Number(parsed && typeof parsed === "object" && "value" in parsed
        ? parsed.value ?? 0
        : parsed ?? 0);
}
async function getUserFlips(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-flips", [principalArg], config);
    if (!data.okay || !data.result) {
        return 0;
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return Number(parsed && typeof parsed === "object" && "value" in parsed
        ? parsed.value ?? 0
        : parsed ?? 0);
}
async function getUserLastSide(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-last-side", [principalArg], config);
    if (!data.okay || !data.result) {
        return 0;
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return Number(parsed && typeof parsed === "object" && "value" in parsed
        ? parsed.value ?? 0
        : parsed ?? 0);
}
async function getLeaderboard(config = {}) {
    const data = await callReadOnly("get-leaderboard", [], config);
    if (!data.okay || !data.result) {
        return [];
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return normalizeLeaderboardValue(parsed);
}
function createFlipCall(config = {}) {
    const resolved = resolveConfig(config);
    return {
        contractAddress: resolved.contractAddress,
        contractName: resolved.contractName,
        functionName: "flip",
        functionArgs: [],
        postConditionMode: transactions_1.PostConditionMode.Deny,
        postConditions: [],
        network: resolved.network,
    };
}
class CoinFlipClient {
    constructor(config = {}) {
        this.config = resolveConfig(config);
    }
    getTotalFlips() {
        return getTotalFlips(this.config);
    }
    getUserFlips(userAddress) {
        return getUserFlips(userAddress, this.config);
    }
    getUserLastSide(userAddress) {
        return getUserLastSide(userAddress, this.config);
    }
    getLeaderboard() {
        return getLeaderboard(this.config);
    }
    createFlipCall() {
        return createFlipCall(this.config);
    }
}
exports.CoinFlipClient = CoinFlipClient;
