import styled from "styled-components";
import { useState } from "react";

import {
  useDecimalPlaceContext,
  useSetDecimalPlaceContext,
} from "../context/decimalPlace";

import { isInputValidInt } from "../utilities/inputValidation";

const Main = styled.div`
  display: flex;

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  & input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const DecimalBox = styled.div`
  display: flex;
`;

const DecimalInput = styled.input`
  background-color: #333333;
  border: solid 2px #333333;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  filter: drop-shadow(0 3px 5px #0000007a);
  outline: none;
  padding: 0.25em;
  text-align: center;
`;

export default function ControlPanel() {
  const decimalPlace = useDecimalPlaceContext();
  const setDecimalPlace = useSetDecimalPlaceContext();

  function handleDecimalChange(e: any) {
    const newValue = e.target.value;
    if (isInputValidInt(e, newValue)) {
      if (newValue === "") {
        setDecimalPlace(0);
      } else {
        setDecimalPlace(parseInt(newValue));
      }
    }
  }
  return (
    <Main>
      <DecimalBox>
        <p>
          Precise to{" "}
          <DecimalInput
            type="number"
            step="1"
            value={decimalPlace}
            onChange={handleDecimalChange}
          />{" "}
          decimal places
        </p>
      </DecimalBox>
    </Main>
  );
}
