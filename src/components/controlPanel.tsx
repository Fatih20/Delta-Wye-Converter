import styled from "styled-components";
import { useState, useEffect } from "react";

import {
  useDecimalPlaceContext,
  useSetDecimalPlaceContext,
} from "../context/decimalPlace";

import { isInputValidInt } from "../utilities/inputValidation";

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1em;

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
  width: 30px;
`;

const DecimalInline = styled.p`
  line-height: 2;
  text-align: center;
`;

export default function ControlPanel() {
  const decimalPlace = useDecimalPlaceContext();
  const setDecimalPlace = useSetDecimalPlaceContext();

  function handleDecimalChange(e: any) {
    const newValue = e.target.value;
    console.log(newValue);
    if (isInputValidInt(e, newValue)) {
      if (newValue === "") {
        setDecimalPlace(0);
      } else if (newValue > 7) {
        setDecimalPlace(7);
      } else {
        console.log(parseInt(newValue));
        setDecimalPlace(parseInt(newValue));
      }
    }
  }

  useEffect(() => {
    console.log(decimalPlace);
  }, [decimalPlace]);
  return (
    <Main>
      <DecimalInline>
        Precise to{" "}
        <DecimalInput
          type="number"
          step="1"
          value={String(decimalPlace).replace(/^0+/, "")}
          onChange={handleDecimalChange}
        />{" "}
        decimal places
      </DecimalInline>
    </Main>
  );
}
