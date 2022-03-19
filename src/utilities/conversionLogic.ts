function deltaToWyeConverter(ra:number, rb:number, rc:number) {
    const resistorSum = ra+rb+rc;
    const r1 = (ra*rb)/resistorSum
    const r2 = (ra*rc)/resistorSum
    const r3 = (rb*rc)/resistorSum
    return {r1, r2, r3}
}

function wyeToDeltaConverter(r1:number, r2:number, r3:number) {
    const resistorProductSum = r1*r2+r2*r3+r3*r1;
    const ra = resistorProductSum/(r3)
    const rb = resistorProductSum/(r2)
    const rc = resistorProductSum/(r1)
    return {ra, rb, rc}
}
export {deltaToWyeConverter, wyeToDeltaConverter};