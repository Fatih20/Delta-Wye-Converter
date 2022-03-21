import { unitLongPrefix, unitPrefixInformation, unitPowerMultiplierArray, unitPowerInformation, unitPowerMultiplier, unitShortPrefix } from "./types";

const toWhatDigit = 7;

function rounder (value : number, decimal : number){
    return parseFloat(value.toFixed(decimal))
}

export function properUnitConverter (givenResistance : number, givenResistanceUnit : unitLongPrefix, toWhatDigit:number) : [number, unitLongPrefix]{
    const currentOrderOfMagnitude = unitPrefixInformation(givenResistanceUnit)[0];
    const actualValue = givenResistance * 10 ** currentOrderOfMagnitude

    const [newValueRaw, closestPowerRaw] = actualValue.toExponential().split('e');
    const newValue = parseFloat(newValueRaw);
    const closestPower = parseInt(closestPowerRaw);

    let differenceBetweenUnitPowerArray : number[] = [];

    unitPowerMultiplierArray.forEach((unitPower) => {
        const differenceBetweenUnitPower = unitPower - closestPower;
        differenceBetweenUnitPowerArray.push(differenceBetweenUnitPower);
        if (differenceBetweenUnitPower === 0) {
            return [newValue, unitPower];
        }
    })

    const smallestPowerDifference = differenceBetweenUnitPowerArray.reduce((previousValue : number, currentValue : number) => {
        if ((Math.abs(currentValue) < Math.abs(previousValue)) && currentValue + closestPower <= 0) {
            return currentValue
        } else {
            return previousValue
        }
    });
        
    const nearestUnitPower = smallestPowerDifference + closestPower;
    const newUnitPowerCompatibleValue = rounder(newValue * (10 ** (-smallestPowerDifference)), toWhatDigit);
    const nearestUnitPowerUnit = unitPowerInformation(nearestUnitPower)[0];

    if (nearestUnitPowerUnit === "Not Found"){
        return [newValue* 10**(-1*closestPower), "none"] as [number, unitLongPrefix]
    } else {
        return [newUnitPowerCompatibleValue ,  nearestUnitPowerUnit]
    }
}

// console.log(properUnitConverter(0.00009, "none"))

function deltaToWyeConverter(ra:number, raUnitPrefix : unitLongPrefix, rb:number, rbUnitPrefix: unitLongPrefix, rc:number, rcUnitPrefix: unitLongPrefix, toWhatDigit: number) {

    const convertedRaValue = ra * 10 ** unitPrefixInformation(raUnitPrefix)[0];
    const convertedRbValue = rb * 10 ** unitPrefixInformation(rbUnitPrefix)[0];
    const convertedRcValue = rc * 10 ** unitPrefixInformation(rcUnitPrefix)[0];

    const resistorSum = convertedRaValue+convertedRbValue+convertedRcValue;
    const r1Raw = (convertedRaValue*convertedRbValue)/resistorSum;
    const r2Raw = (convertedRaValue*convertedRcValue)/resistorSum;
    const r3Raw = (convertedRbValue*convertedRcValue)/resistorSum;

    const [r1, adjustedR1Unit] = properUnitConverter(r1Raw, "none", toWhatDigit);
    const [r2, adjustedR2Unit] = properUnitConverter(r2Raw, "none", toWhatDigit);
    const [r3, adjustedR3Unit] = properUnitConverter(r3Raw, "none", toWhatDigit);

    return {r1, adjustedR1Unit, r2, adjustedR2Unit, r3, adjustedR3Unit}
}

function wyeToDeltaConverter(r1:number, r1UnitPrefix : unitLongPrefix, r2:number, r2UnitPrefix: unitLongPrefix, r3:number, r3UnitPrefix: unitLongPrefix, toWhatDigit:number) {
    
    const convertedR1Value = r1 * 10 ** unitPrefixInformation(r1UnitPrefix)[0];
    const convertedR2Value = r2 * 10 ** unitPrefixInformation(r2UnitPrefix)[0];
    const convertedR3Value = r3 * 10 ** unitPrefixInformation(r3UnitPrefix)[0];
    
    const resistorProductSum = convertedR1Value*convertedR2Value+convertedR2Value*convertedR3Value+convertedR3Value*convertedR1Value;
    const raRaw = resistorProductSum/(convertedR3Value);
    const rbRaw = resistorProductSum/(convertedR2Value);
    const rcRaw = resistorProductSum/(convertedR1Value);

    const [ra, adjustedRaUnit] = properUnitConverter(raRaw, "none", toWhatDigit);
    const [rb, adjustedRbUnit] = properUnitConverter(rbRaw, "none", toWhatDigit);
    const [rc, adjustedRcUnit] = properUnitConverter(rcRaw, "none", toWhatDigit);

    return {ra, adjustedRaUnit, rb, adjustedRbUnit, rc, adjustedRcUnit}
}

export {deltaToWyeConverter, wyeToDeltaConverter};