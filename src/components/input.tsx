import { useState } from "react";
import { inputConnectedVariable } from "../utilities/types";
import styled from "styled-components";

import {
  unitCompletePrefix,
  completePrefixArray,
  unitLongPrefixArray,
  unitLongPrefix,
  unitPrefixInformation,
} from "../utilities/types";

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  background-color: #333333;
  border: solid 2px #333333;
  border-radius: 4px;
  box-sizing: border-box;
  color: #fafafa;
  filter: drop-shadow(0 3px 5px #0000007a);
  padding: 0.4em;
`;

const StyledSelect = styled.select`
  background-color: #333333;
  border: solid 2px #333333;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  filter: drop-shadow(0 3px 5px #0000007a);
  outline: none;
  padding: 0.25em;
  text-align: center;
`;

const StyledOption = styled.option``;

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
  setStateOfUnitPrefix,
  currentUnitPrefix,
}: {
  externalValue: inputConnectedVariable;
  setExternalValue: (arg0: inputConnectedVariable) => void;
  setStateOfChangingDtW: () => void;
  setStateOfUnitPrefix: (arg0: unitLongPrefix) => void;
  currentUnitPrefix: unitLongPrefix;
}) {
  function handleValueChange(e: any) {
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

  function handleUnitChange(e: any) {
    const newUnitLongPrefix = e.target.value;
    console.log(newUnitLongPrefix);
    setStateOfChangingDtW();
    setStateOfUnitPrefix(newUnitLongPrefix);
  }

  return (
    <Main>
      <StyledInput
        type="number"
        value={externalValue}
        onChange={handleValueChange}
      />
      <StyledSelect value={currentUnitPrefix} onChange={handleUnitChange}>
        {unitLongPrefixArray.map((prefix) => {
          // if (prefix === defaultUnitPrefix) {
          //   return (
          //     <StyledOption value={prefix} selected>
          //       {unitPrefixInformation(prefix)[1]} &Omega;
          //     </StyledOption>
          //   );
          // } else {
          //   return (
          //     <StyledOption value={prefix}>
          //       {unitPrefixInformation(prefix)[1]}&Omega;
          //     </StyledOption>
          //   );
          // }
          return (
            <StyledOption value={prefix}>
              {unitPrefixInformation(prefix)[1]}&Omega;
            </StyledOption>
          );
        })}
      </StyledSelect>
    </Main>
  );
}
