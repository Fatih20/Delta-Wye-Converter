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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;

  & input {
    position: absolute;
  }

  /* border: solid 1px white; */
`;

const DeltaFieldContainer = styled(FieldContainer)`
  & input {
    top: 0;
    left: 30%;
  }
`;

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
      </DeltaFieldContainer>
      <Spacer />
      <FieldContainer>
        <img src={wyeImage} alt="3 resistors arranged in wye" />
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
      </FieldContainer>
    </Main>
  );
}
