import { unitLongPrefix, unitPrefixInformation, unitPowerMultiplierArray, unitPowerInformation, unitPowerMultiplier, unitShortPrefix } from "./types";

const toWhatDigit = 7;

function rounder (value : number, decimal : number){
    return parseFloat(value.toFixed(decimal))
}

function deltaToWyeConverter(ra:number, rb:number, rc:number) {
    const resistorSum = ra+rb+rc;
    const r1 = rounder((ra*rb)/resistorSum, toWhatDigit)
    const r2 = rounder((ra*rc)/resistorSum, toWhatDigit)
    const r3 = rounder((rb*rc)/resistorSum, toWhatDigit)
    return {r1, r2, r3}
}

function wyeToDeltaConverter(r1:number, r2:number, r3:number) {
    const resistorProductSum = r1*r2+r2*r3+r3*r1;
    const ra = rounder(resistorProductSum/(r3), toWhatDigit)
    const rb = rounder(resistorProductSum/(r2), toWhatDigit)
    const rc = rounder(resistorProductSum/(r1), toWhatDigit)
    return {ra, rb, rc}
}

export function properUnitConverter (givenResistance : number) : [number, unitLongPrefix]{
    // const currentOrderOfMagnitude = 10** unitPrefixInformation(unit)[0]
    const [newValueRaw, closestPowerRaw] = givenResistance.toExponential().split('e');
    const newValue = parseFloat(newValueRaw);
    const closestPower = parseInt(closestPowerRaw);
    // let differenceBetweenUnitPowerArray : [number, unitPowerMultiplier][] = [];
    let differenceBetweenUnitPowerArray : number[] = [];


    unitPowerMultiplierArray.forEach((unitPower) => {
        // const differenceBetweenUnitPower = Math.abs(unitPower - closestPower);
        const differenceBetweenUnitPower = unitPower - closestPower;
        // differenceBetweenUnitPowerArray.push([differenceBetweenUnitPower, unitPower]);
        differenceBetweenUnitPowerArray.push(differenceBetweenUnitPower);
        if (differenceBetweenUnitPower === 0) {
            return [newValue, unitPower];
        }
    })

    const smallestPowerDifference = differenceBetweenUnitPowerArray.reduce((previousValue : number, currentValue : number) => {
        if (Math.abs(currentValue) < Math.abs(previousValue)) {
            return currentValue
        } else {
            return previousValue
        }
    }, 0 as number);

    const nearestUnitPower = smallestPowerDifference + closestPower;
    const newUnitPowerCompatibleValue = newValue * 10 **(smallestPowerDifference);
    const nearestUnitPowerUnit = unitPowerInformation(nearestUnitPower)[0];

    if (nearestUnitPowerUnit === "Not Found"){
        return [newValue* 10**(-1*closestPower), "none"] as [number, unitLongPrefix]
    } else {
        return [newUnitPowerCompatibleValue ,  nearestUnitPowerUnit]
    }


}

export {deltaToWyeConverter, wyeToDeltaConverter};