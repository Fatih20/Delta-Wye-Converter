export type inputConnectedVariable = "" | number;

export const unitPowerMultiplierArray = [-12, -9, -6, -3, 0, 3, 6, 9] as const;
// const unitShortPrefixArray = <const> ["p", "n", "&mu;", "m", "", "k", "M", "G"]
const unitShortPrefixArray = <const> ["p", "n", "\u03BC", "m", "", "k", "M", "G"]
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
        return [-6, "\u03BC"];
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

export function unitPowerInformation (givenPower : number) : [unitLongPrefix | "Not Found", unitShortPrefix | "Not Found"]{
    if (givenPower === -12){
        return ["pico", "p"];
    } else if (givenPower === -9){
        return ["nano", "n"];
    } else if (givenPower === -6) {
        return ["micro", "\u03BC"];
    } else if (givenPower === -3){
        return ["mili", "m"];
    } else if (givenPower === 0){
        return ["none", ""];
    }else if (givenPower === 3){
        return ["kilo", "k"];
    } else if (givenPower === 6){
        return ["mega", "M"];
    } else if (givenPower === 9){
        return ["giga", "G"];
    } else {
        return ["Not Found", "Not Found"];
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

export type componentUsedType = "R" | "L" | "C";
export type unitOfComponentUsedType = "H" | "\u03A9" | "F";

export function unitOfComponentInformation (usedComponent : componentUsedType) : unitOfComponentUsedType {
    if (usedComponent === "R"){
        return "\u03A9"
    } else if (usedComponent === "C"){
        return "F"
    } else if (usedComponent === "L"){
        return "H"
    } else {
        return "H"
    }
}

export type completePrefix = typeof completePrefixArray[number];

export type  conversionFunctionOutputType = [number, unitLongPrefix, number, unitLongPrefix, number, unitLongPrefix];

export type conversionFunctionType = (arg0:number, arg1 : unitLongPrefix, arg2:number, arg3: unitLongPrefix, arg4:number, arg5: unitLongPrefix, arg6: number) => conversionFunctionOutputType;