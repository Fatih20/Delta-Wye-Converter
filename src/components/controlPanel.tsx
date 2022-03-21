import styled from "styled-components";
import { useState, useEffect } from "react";

import {
  useDecimalPlaceContext,
  useSetDecimalPlaceContext,
} from "../context/decimalPlace";

import { isInputValidInt } from "../utilities/inputValidation";
import { VanillaButton } from "../GlobalComponent";

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

  & input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const DecimalInput = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: 20px 50px 20px;
  /* grid-template-rows: 1fr; */
  grid-template-areas: "remover input adder";
`;

const IncrementerButton = styled(VanillaButton)`
  background-color: #333333;
  color: white;
`;

const DecimalBox = styled.input`
  background-color: #333333;
  border: solid 2px #333333;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  filter: drop-shadow(0 3px 5px #0000007a);
  grid-area: input;
  outline: none;
  padding: 0.25em;
  text-align: center;
  /* width: 50px; */
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

  function incrementer(isIncrease: boolean) {
    if (isIncrease) {
      if (decimalPlace < 7) {
        setDecimalPlace(decimalPlace + 1);
      }
    } else {
      if (decimalPlace > 0) {
        setDecimalPlace(decimalPlace - 1);
      }
    }
  }

  useEffect(() => {
    console.log(decimalPlace);
  }, [decimalPlace]);
  return (
    <Main>
      <DecimalInline>Precise to</DecimalInline>
      <DecimalInput>
        <IncrementerButton onClick={() => incrementer(false)}>
          -
        </IncrementerButton>
        <DecimalBox
          type="number"
          step="1"
          value={decimalPlace}
          onChange={handleDecimalChange}
          readOnly
        />{" "}
        <IncrementerButton onClick={() => incrementer(true)}>
          +
        </IncrementerButton>
      </DecimalInput>
      <DecimalInline>decimal places</DecimalInline>
    </Main>
  );
}
