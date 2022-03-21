const listOfNumber = Array.from({ length: 10 }, (_, i) => i.toString());
const setOfValidIntCharacter = new Set(listOfNumber);
const setOfValidFloatCharacter = new Set(listOfNumber.concat(["."]));

function countInArray(array: string[], checkedValue: string) {
    return array.reduce(
      (count, element) => count + (element === checkedValue ? 1 : 0),
      0
    );
  }

export function isInputValidFloat (e : any, givenValue : string) : boolean{
    let inputValid = true;
    // Handle backspace
    if (e.nativeEvent.data === null && givenValue.length > 0) {
      givenValue = givenValue.substring(0, givenValue.length);
    }

    if (
      givenValue.length > 0 &&
      countInArray(e.target.value.split(""), ".") > 1
    ) {
      inputValid = false;
    }

    if (
      e.nativeEvent.data !== null &&
      !setOfValidFloatCharacter.has(e.nativeEvent.data)
    ) {
      inputValid = false;
    }

    return inputValid;
}

export function isInputValidInt (e : any, givenValue : string) : boolean{
    let inputValid = true;
    // Handle backspace
    if (e.nativeEvent.data === null && givenValue.length > 0) {
      givenValue = givenValue.substring(0, givenValue.length);
    }

    if (
        givenValue.length > 0 &&
        countInArray(e.target.value.split(""), ".") > 0
      ) {
        inputValid = false;
      }

    if (
      e.nativeEvent.data !== null &&
      !setOfValidIntCharacter.has(e.nativeEvent.data)
    ) {
      inputValid = false;
    }

    return inputValid;
}