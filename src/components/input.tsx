import { useState } from "react";
import { inputConnectedVariable } from "../utilities/types";
import styled from "styled-components";

const StyledInput = styled.input`
  border: solid 2px #333333;
  border-radius: 4px;
  background-color: #333333;
  color: #fafafa;
  filter: drop-shadow(0 3px 5px #0000007a);
  padding: 0.4em;
`;

function countInArray(array: string[], checkedValue: string) {
  return array.reduce(
    (count, element) => count + (element === checkedValue ? 1 : 0),
    0
  );
}

const listOfNumber = Array.from({ length: 10 }, (_, i) => i.toString());
const setOfValidCharacter = new Set(listOfNumber.concat(["."]));

export default function ValidatedInput({
  externalValue,
  setExternalValue,
  setStateOfChangingDtW,
}: {
  externalValue: inputConnectedVariable;
  setExternalValue: (arg0: inputConnectedVariable) => void;
  setStateOfChangingDtW: () => void;
}) {
  function handleChange(e: any) {
    let newValue = e.target.value;
    let inputValid = true;
    // Handle backspace
    if (e.nativeEvent.data === null && newValue.length > 0) {
      newValue = newValue.substring(0, newValue.length);
    }

    if (
      newValue.length > 0 &&
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

    if (inputValid) {
      setStateOfChangingDtW();
      if (newValue.length > 0) {
        console.log(newValue);
        setExternalValue(parseFloat(newValue));
      } else {
        setExternalValue("");
      }
    }
  }

  return (
    <StyledInput type="number" value={externalValue} onChange={handleChange} />
  );
}
