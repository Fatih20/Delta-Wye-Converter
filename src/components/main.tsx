import { useState, useEffect } from "react";
import styled from "styled-components";

import { inputConnectedVariable } from "../utilities/types";
import ValidatedInput from "./input";

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

  /* border: solid 1px white; */
`;

const Spacer = styled.div`
  margin: 20px 0 20px 0;
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
      <FieldContainer>
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
      </FieldContainer>
      <Spacer />
      <FieldContainer>
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
