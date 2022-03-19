import { useState, useEffect } from "react";
import styled from "styled-components";

import { inputConnectedVariable } from "../utilities/types";
import ValidatedInput from "./input";

import deltaImage from "../images/DeltaCompressed.svg";
import wyeImage from "../images/WyeCompressed.svg";

import {
  deltaToWyeConverter,
  wyeToDeltaConverter,
} from "../utilities/conversionLogic";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`;

const FieldContainer = styled.div`
  /* align-items: center; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;
  padding: 20% 0 0 0;
  position: relative;

  /* border: solid 1px white; */
`;

const DeltaInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    ". ra ra ."
    "rb rb rc rc"
    ". . . .";

  height: 100%;
  justify-items: center;
  position: absolute;
  width: 100%;
  z-index: 10;

  & input {
    align-self: center;
    width: 50px;
  }

  & input:nth-child(1) {
    grid-area: ra;
  }

  & input:nth-child(2) {
    grid-area: rb;
  }

  & input:nth-child(3) {
    grid-area: rc;
  }

  /* border: solid 1px white; */
`;

const WyeInputContainer = styled.div`
  display: grid;
  grid-template-columns: 16% 1fr 1fr 1fr 16%;
  grid-template-rows: 16% 1fr 16% 1fr 20%;
  grid-template-areas:
    ". . . . ."
    ". r1 . r2 ."
    ". . . . ."
    ". . r3 . ."
    ". . . . .";

  height: 100%;
  justify-items: center;
  position: absolute;
  width: 100%;
  z-index: 10;

  & input {
    align-self: center;
    width: 50px;
  }

  & input:nth-child(1) {
    grid-area: r1;
  }

  & input:nth-child(2) {
    grid-area: r2;
  }

  & input:nth-child(3) {
    grid-area: r3;
  }
`;

const DeltaFieldContainer = styled(FieldContainer)``;

const Spacer = styled.div`
  margin: 20px 0 20px 0;
`;

const SVGContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  & * {
    width: 100%;
  }
  /* border: solid 1px white; */
`;

export default function MainConversion() {
  const [convertingDtW, setConvertingDtW] = useState(true);

  const [raValue, setRaValue] = useState("" as inputConnectedVariable);
  const [rbValue, setRbValue] = useState("" as inputConnectedVariable);
  const [rcValue, setRcValue] = useState("" as inputConnectedVariable);

  const [r1Value, setR1Value] = useState("" as inputConnectedVariable);
  const [r2Value, setR2Value] = useState("" as inputConnectedVariable);
  const [r3Value, setR3Value] = useState("" as inputConnectedVariable);

  useEffect(
    () => {
      if (convertingDtW) {
        if (!(raValue === "" || rbValue === "" || rcValue === "")) {
          const { r1, r2, r3 } = deltaToWyeConverter(raValue, rbValue, rcValue);
          setR1Value(r1);
          setR2Value(r2);
          setR3Value(r3);
        }
      } else {
        if (!(r1Value === "" || r2Value === "" || r3Value === "")) {
          const { ra, rb, rc } = wyeToDeltaConverter(r1Value, r2Value, r3Value);
          setRaValue(ra);
          setRbValue(rb);
          setRcValue(rc);
        }
      }
    },
    convertingDtW ? [raValue, rbValue, rcValue] : [r1Value, r2Value, r3Value]
  );
  return (
    <Main>
      <DeltaFieldContainer>
        <SVGContainer>
          <img src={deltaImage} alt="3 resistors arranged in delta" />
        </SVGContainer>
        <DeltaInputContainer>
          <ValidatedInput
            externalValue={raValue}
            setExternalValue={setRaValue}
            setStateOfChangingDtW={() => setConvertingDtW(true)}
          />
          <ValidatedInput
            externalValue={rbValue}
            setExternalValue={setRbValue}
            setStateOfChangingDtW={() => setConvertingDtW(true)}
          />
          <ValidatedInput
            externalValue={rcValue}
            setExternalValue={setRcValue}
            setStateOfChangingDtW={() => setConvertingDtW(true)}
          />
        </DeltaInputContainer>
      </DeltaFieldContainer>
      <Spacer />
      <FieldContainer>
        <SVGContainer>
          <img src={wyeImage} alt="3 resistors arranged in wye" />
        </SVGContainer>
        <WyeInputContainer>
          <ValidatedInput
            externalValue={r1Value}
            setExternalValue={setR1Value}
            setStateOfChangingDtW={() => setConvertingDtW(false)}
          />
          <ValidatedInput
            externalValue={r2Value}
            setExternalValue={setR2Value}
            setStateOfChangingDtW={() => setConvertingDtW(false)}
          />
          <ValidatedInput
            externalValue={r3Value}
            setExternalValue={setR3Value}
            setStateOfChangingDtW={() => setConvertingDtW(false)}
          />
        </WyeInputContainer>
      </FieldContainer>
    </Main>
  );
}
