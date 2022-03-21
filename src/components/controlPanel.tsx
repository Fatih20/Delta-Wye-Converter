import styled from "styled-components";
import { useState, useEffect } from "react";

import {
  useDecimalPlaceContext,
  useSetDecimalPlaceContext,
} from "../context/decimalPlace";

import {
  useComponentUsedContext,
  useSetComponentUsedContext,
  useUnitOfComponentUsedContext,
} from "../context/componentUsed";

import { isInputValidInt } from "../utilities/inputValidation";
import { VanillaButton } from "../GlobalComponent";

interface IComponentButton {
  selected: boolean;
}

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

const ComponentChooserContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
  justify-content: center;
`;

const ComponentButton = styled(VanillaButton)<IComponentButton>`
  border: solid 1px #000000;
  border-radius: 2px;
  background-color: #333333;
  color: ${({ selected }) => (selected ? "white" : "#abacae")};
  filter: drop-shadow(0 3px 5px #0000007a);
  padding: 5px 0;
  width: 75px;
`;

export default function ControlPanel() {
  const decimalPlace = useDecimalPlaceContext();
  const setDecimalPlace = useSetDecimalPlaceContext();
  const componentUsed = useComponentUsedContext();
  const unitOfComponentUsed = useUnitOfComponentUsedContext();
  const setComponentUsed = useSetComponentUsedContext();

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

  return (
    <Main>
      <ComponentChooserContainer>
        <ComponentButton
          onClick={() => setComponentUsed("R")}
          selected={componentUsed === "R"}
        >
          Resistor
        </ComponentButton>
        <ComponentButton
          onClick={() => setComponentUsed("L")}
          selected={componentUsed === "L"}
        >
          Inductor
        </ComponentButton>
        <ComponentButton
          onClick={() => setComponentUsed("C")}
          selected={componentUsed === "C"}
        >
          Capacitor
        </ComponentButton>
      </ComponentChooserContainer>
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
