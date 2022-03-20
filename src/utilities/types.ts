export type inputConnectedVariable = "" | number;

const unitPowerMultiplierArray = [-12, -9, -6, -3, 0, 3, 6, 9]
const unitShortPrefixArray = ["p", "n", "&mu;", "m", "", "k", "M", "G"]
const unitLongPrefixArray = ["pico", "nano", "micro", "mili", "", "kilo", "mega", "giga"]

export type unitPowerMultiplier = typeof unitPowerMultiplierArray[number];
export type unitShortPrefix = typeof unitShortPrefixArray[number];
export type unitLongPrefix = typeof unitLongPrefixArray[number];

export type unitCompletePrefix = [unitPowerMultiplier, unitShortPrefix, unitLongPrefix];

const completePrefixArray : unitCompletePrefix[] = [
    [-12, "p", "pico"],
    [-9, "n", "nano"],
    [-6, "&mu;", "micro"],
    [-3, "m", "mili"],
    [0, "", ""],
    [3, "k","kilo"],
    [6, "M", "mega"],
    [9, "G", "giga"]

]

export type completePrefix = typeof completePrefixArray[number];