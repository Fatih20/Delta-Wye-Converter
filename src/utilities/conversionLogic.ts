import { unitLongPrefix, unitPrefixInformation, unitPowerMultiplierArray, unitPowerInformation, unitPowerMultiplier, unitShortPrefix, componentUsedType, conversionFunctionType, conversionFunctionOutputType } from "./types";

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
        if ((Math.abs(currentValue) < Math.abs(previousValue))) {
            if ((closestPower > -1 && currentValue + closestPower > -1) || (closestPower <= 0 && currentValue + closestPower <= -1)) {
                return currentValue
            }
        } 
        return previousValue
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

function deltaToWyeConverterC (partA:number, partAUnitPrefix : unitLongPrefix, partB:number, partBUnitPrefix: unitLongPrefix, partC:number, partCUnitPrefix: unitLongPrefix, toWhatDigit: number){
    const convertedReciprocalPartAValue = 1/(partA * 10 ** unitPrefixInformation(partAUnitPrefix)[0]);
    const convertedReciprocalPartBValue = 1/(partB * 10 ** unitPrefixInformation(partBUnitPrefix)[0]);
    const convertedReciprocalPartCValue = 1/(partC * 10 ** unitPrefixInformation(partCUnitPrefix)[0]);

    const reciprocalResistorSum = convertedReciprocalPartAValue+convertedReciprocalPartBValue+convertedReciprocalPartCValue;
    const part1Raw = 1/((convertedReciprocalPartAValue*convertedReciprocalPartBValue)/reciprocalResistorSum);
    const part2Raw = 1/((convertedReciprocalPartAValue*convertedReciprocalPartCValue)/reciprocalResistorSum);
    const part3Raw = 1/((convertedReciprocalPartBValue*convertedReciprocalPartCValue)/reciprocalResistorSum);

    const [part1, adjustedPart1Unit] = properUnitConverter(part1Raw, "none", toWhatDigit);
    const [part2, adjustedPart2Unit] = properUnitConverter(part2Raw, "none", toWhatDigit);
    const [part3, adjustedPart3Unit] = properUnitConverter(part3Raw, "none", toWhatDigit);

    return [part1, adjustedPart1Unit, part2, adjustedPart2Unit, part3, adjustedPart3Unit] as conversionFunctionOutputType;
}

function wyeToDeltaConverterC(part1:number, part1UnitPrefix : unitLongPrefix, part2:number, part2UnitPrefix: unitLongPrefix, part3:number, part3UnitPrefix: unitLongPrefix, toWhatDigit: number) {
    const convertedReciprocalPart1Value = 1/(part1 * 10 ** unitPrefixInformation(part1UnitPrefix)[0]);
    const convertedReciprocalPart2Value = 1/(part2 * 10 ** unitPrefixInformation(part2UnitPrefix)[0]);
    const convertedReciprocalPart3Value = 1/(part3 * 10 ** unitPrefixInformation(part3UnitPrefix)[0]);
    
    const resistorReciprocalProductSum = convertedReciprocalPart1Value*convertedReciprocalPart2Value+convertedReciprocalPart2Value*convertedReciprocalPart3Value+convertedReciprocalPart3Value*convertedReciprocalPart1Value;
    const partARaw = 1/(resistorReciprocalProductSum/(convertedReciprocalPart3Value));
    const partBRaw = 1/(resistorReciprocalProductSum/(convertedReciprocalPart2Value));
    const partCRaw = 1/(resistorReciprocalProductSum/(convertedReciprocalPart1Value));

    const [partA, adjustedPartAUnit] = properUnitConverter(partARaw, "none", toWhatDigit);
    const [partB, adjustedPartBUnit] = properUnitConverter(partBRaw, "none", toWhatDigit);
    const [partC, adjustedPartCUnit] = properUnitConverter(partCRaw, "none", toWhatDigit);

    return [partA, adjustedPartAUnit, partB, adjustedPartBUnit, partC, adjustedPartCUnit] as conversionFunctionOutputType;
}

function deltaToWyeConverterRL(partA:number, partAUnitPrefix : unitLongPrefix, partB:number, partBUnitPrefix: unitLongPrefix, partC:number, partCUnitPrefix: unitLongPrefix, toWhatDigit: number) {

    const convertedPartAValue = partA * 10 ** unitPrefixInformation(partAUnitPrefix)[0];
    const convertedPartBValue = partB * 10 ** unitPrefixInformation(partBUnitPrefix)[0];
    const convertedPartCValue = partC * 10 ** unitPrefixInformation(partCUnitPrefix)[0];

    const resistorSum = convertedPartAValue+convertedPartBValue+convertedPartCValue;
    const part1Raw = (convertedPartAValue*convertedPartBValue)/resistorSum;
    const part2Raw = (convertedPartAValue*convertedPartCValue)/resistorSum;
    const part3Raw = (convertedPartBValue*convertedPartCValue)/resistorSum;

    const [part1, adjustedPart1Unit] = properUnitConverter(part1Raw, "none", toWhatDigit);
    const [part2, adjustedPart2Unit] = properUnitConverter(part2Raw, "none", toWhatDigit);
    const [part3, adjustedPart3Unit] = properUnitConverter(part3Raw, "none", toWhatDigit);

    return [part1, adjustedPart1Unit, part2, adjustedPart2Unit, part3, adjustedPart3Unit] as conversionFunctionOutputType;
}

export function wyeToDeltaConverterRL(part1:number, part1UnitPrefix : unitLongPrefix, part2:number, part2UnitPrefix: unitLongPrefix, part3:number, part3UnitPrefix: unitLongPrefix, toWhatDigit: number) {
    
    const convertedPart1Value = part1 * 10 ** unitPrefixInformation(part1UnitPrefix)[0];
    const convertedPart2Value = part2 * 10 ** unitPrefixInformation(part2UnitPrefix)[0];
    const convertedPart3Value = part3 * 10 ** unitPrefixInformation(part3UnitPrefix)[0];
    
    const resistorProductSum = convertedPart1Value*convertedPart2Value+convertedPart2Value*convertedPart3Value+convertedPart3Value*convertedPart1Value;
    const partARaw = resistorProductSum/(convertedPart3Value);
    const partBRaw = resistorProductSum/(convertedPart2Value);
    const partCRaw = resistorProductSum/(convertedPart1Value);

    const [partA, adjustedPartAUnit] = properUnitConverter(partARaw, "none", toWhatDigit);
    const [partB, adjustedPartBUnit] = properUnitConverter(partBRaw, "none", toWhatDigit);
    const [partC, adjustedPartCUnit] = properUnitConverter(partCRaw, "none", toWhatDigit);

    return [partA, adjustedPartAUnit, partB, adjustedPartBUnit, partC, adjustedPartCUnit] as conversionFunctionOutputType;
}

export function conversionFunction (componentUsed : componentUsedType, DeltaToWyeConversion : boolean ) : conversionFunctionType{
    if (DeltaToWyeConversion){
        if (componentUsed === "C"){
            return deltaToWyeConverterC;
        } else {
            return deltaToWyeConverterRL;
        }
    } else {
        if (componentUsed === "C"){
            return wyeToDeltaConverterC;
        } else {
            return wyeToDeltaConverterRL;
        }
    }
}