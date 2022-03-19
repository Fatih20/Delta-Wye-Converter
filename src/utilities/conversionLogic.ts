function rounder (value : number, decimal : number){
    return parseFloat(value.toFixed(decimal))
}

function deltaToWyeConverter(ra:number, rb:number, rc:number) {
    const resistorSum = ra+rb+rc;
    const r1 = rounder((ra*rb)/resistorSum, 5)
    const r2 = rounder((ra*rc)/resistorSum, 5)
    const r3 = rounder((rb*rc)/resistorSum, 5)
    return {r1, r2, r3}
}

function wyeToDeltaConverter(r1:number, r2:number, r3:number) {
    const resistorProductSum = r1*r2+r2*r3+r3*r1;
    const ra = rounder(resistorProductSum/(r3), 5)
    const rb = rounder(resistorProductSum/(r2), 5)
    const rc = rounder(resistorProductSum/(r1), 5)
    return {ra, rb, rc}
}
export {deltaToWyeConverter, wyeToDeltaConverter};