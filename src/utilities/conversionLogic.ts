import { unitLongPrefix, unitPrefixInformation, unitPowerMultiplierArray, unitPowerInformation, unitPowerMultiplier, unitShortPrefix } from "./types";

const toWhatDigit = 7;

function rounder (value : number, decimal : number){
    return parseFloat(value.toFixed(decimal))
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

function deltaToWyeConverter(ra:number, raUnitPrefix : unitLongPrefix, rb:number, rbUnitPrefix: unitLongPrefix, rc:number, rcUnitPrefix: unitLongPrefix) {

    const convertedRaValue = ra * 10 ** unitPrefixInformation(raUnitPrefix)[0];
    const convertedRbValue = rb * 10 ** unitPrefixInformation(rbUnitPrefix)[0];
    const convertedRcValue = rc * 10 ** unitPrefixInformation(rcUnitPrefix)[0];

    const resistorSum = convertedRaValue+convertedRbValue+convertedRcValue;
    const r1Raw = rounder((convertedRaValue*convertedRbValue)/resistorSum, toWhatDigit)
    const r2Raw = rounder((convertedRaValue*convertedRcValue)/resistorSum, toWhatDigit)
    const r3Raw = rounder((convertedRbValue*convertedRcValue)/resistorSum, toWhatDigit)

    const [r1, adjustedR1Unit] = properUnitConverter(r1Raw);
    const [r2, adjustedR2Unit] = properUnitConverter(r2Raw);
    const [r3, adjustedR3Unit] = properUnitConverter(r3Raw);

    return {r1, adjustedR1Unit, r2, adjustedR2Unit, r3, adjustedR3Unit}
}

function wyeToDeltaConverter(r1:number, r1UnitPrefix : unitLongPrefix, r2:number, r2UnitPrefix: unitLongPrefix, r3:number, r3UnitPrefix: unitLongPrefix) {
    
    const convertedR1Value = r1 * 10 ** unitPrefixInformation(r1UnitPrefix)[0];
    const convertedR2Value = r2 * 10 ** unitPrefixInformation(r2UnitPrefix)[0];
    const convertedR3Value = r3 * 10 ** unitPrefixInformation(r3UnitPrefix)[0];
    
    const resistorProductSum = convertedR1Value*convertedR2Value+convertedR2Value*convertedR3Value+convertedR3Value*convertedR1Value;
    const raRaw = rounder(resistorProductSum/(convertedR3Value), toWhatDigit);
    const rbRaw = rounder(resistorProductSum/(convertedR2Value), toWhatDigit);
    const rcRaw = rounder(resistorProductSum/(convertedR1Value), toWhatDigit);

    const [ra, adjustedRaUnit] = properUnitConverter(raRaw);
    const [rb, adjustedRbUnit] = properUnitConverter(rbRaw);
    const [rc, adjustedRcUnit] = properUnitConverter(rcRaw);

    return {ra, adjustedRaUnit, rb, adjustedRbUnit, rc, adjustedRcUnit}
}

export {deltaToWyeConverter, wyeToDeltaConverter};