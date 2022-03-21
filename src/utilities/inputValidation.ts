const listOfNumber = Array.from({ length: 10 }, (_, i) => i.toString());
const setOfValidCharacter = new Set(listOfNumber.concat(["."]));

function countInArray(array: string[], checkedValue: string) {
    return array.reduce(
      (count, element) => count + (element === checkedValue ? 1 : 0),
      0
    );
  }

function isInputValid (e : any, givenValue : string) : boolean{
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
      !setOfValidCharacter.has(e.nativeEvent.data)
    ) {
      inputValid = false;
    }

    return inputValid;
}

export default isInputValid;