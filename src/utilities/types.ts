export type inputConnectedVariable = "" | number;

const unitPowerMultiplierArray = <const> [-12, -9, -6, -3, 0, 3, 6, 9]
const unitShortPrefixArray = <const> ["p", "n", "&mu;", "m", "", "k", "M", "G"]
export const unitLongPrefixArray = <const> ["pico", "nano", "micro", "mili", "none", "kilo", "mega", "giga"]

export type unitPowerMultiplier = typeof unitPowerMultiplierArray[number];
export type unitShortPrefix = typeof unitShortPrefixArray[number];
export type unitLongPrefix = typeof unitLongPrefixArray[number];

export type unitCompletePrefix = [unitPowerMultiplier, unitShortPrefix, unitLongPrefix];

interface IUnitPrefixShape {
    "pico" : [unitPowerMultiplier, unitShortPrefix];
    "nano" : [unitPowerMultiplier, unitShortPrefix];
    "mili" : [unitPowerMultiplier, unitShortPrefix];
    "none" : [unitPowerMultiplier, unitShortPrefix];
    "kilo" : [unitPowerMultiplier, unitShortPrefix];
    "mega" : [unitPowerMultiplier, unitShortPrefix];
    "giga" : [unitPowerMultiplier, unitShortPrefix];
}

export function unitPrefixInformation (givenUnitLongPrefix : unitLongPrefix) : [unitPowerMultiplier, unitShortPrefix] {
    if (givenUnitLongPrefix === "pico"){
        return [-12, "p"];
    } else if (givenUnitLongPrefix === "nano"){
        return [-9, "n"];
    } else if (givenUnitLongPrefix === "micro") {
        return [-6, "&mu;"];
    } else if (givenUnitLongPrefix === "mili"){
        return [-3, "m"];
    } else if (givenUnitLongPrefix === "none"){
        return [0, ""];
    }else if (givenUnitLongPrefix === "kilo"){
        return [3, "k"];
    } else if (givenUnitLongPrefix === "mega"){
        return [6, "M"];
    } else if (givenUnitLongPrefix === "giga"){
        return [9, "G"];
    } else {
        return [9, "G"];
    }
}

export const unitPrefix : IUnitPrefixShape  = {
    "pico" : [-12, "p"],
    "nano" : [-9, "n"],
    "mili" : [-3, "m"],
    "none" : [0, ""],
    "kilo" : [3, "k"],
    "mega" : [6, "M"],
    "giga" : [9, "G"]
}

export const completePrefixArray : unitCompletePrefix[] = [
    [-12, "p", "pico"],
    [-9, "n", "nano"],
    // [-6, `&mu;`, "micro"],
    [-3, "m", "mili"],
    [0, "", "none"],
    [3, "k","kilo"],
    [6, "M", "mega"],
    [9, "G", "giga"]

]

export type completePrefix = typeof completePrefixArray[number];