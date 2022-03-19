import { useState, useEffect } from "react";
import styled from "styled-components";

import { inputConnectedVariable } from "./utilities/types";
import ValidatedInput from "./components/input";

import { deltaToWyeConverter } from "./utilities/conversionLogic";

const Spacer = styled.div`
  margin: 20px 0 20px 0;
`;

function App() {
  const [r1Value, setR1Value] = useState("" as inputConnectedVariable);
  const [r2Value, setR2Value] = useState("" as inputConnectedVariable);
  const [r3Value, setR3Value] = useState("" as inputConnectedVariable);

  const [raValue, setRaValue] = useState("" as inputConnectedVariable);
  const [rbValue, setRbValue] = useState("" as inputConnectedVariable);
  const [rcValue, setRcValue] = useState("" as inputConnectedVariable);

  useEffect(() => {
    if (!(raValue === "" || rbValue === "" || rcValue === "")) {
      const { r1, r2, r3 } = deltaToWyeConverter(raValue, rbValue, rcValue);
      setR1Value(r1);
      setR2Value(r2);
      setR3Value(r3);
    }
  }, [raValue, rbValue, rcValue]);
  return (
    <>
      <ValidatedInput externalValue={raValue} setExternalValue={setRaValue} />
      <ValidatedInput externalValue={rbValue} setExternalValue={setRbValue} />
      <ValidatedInput externalValue={rcValue} setExternalValue={setRcValue} />
      <Spacer />
      <ValidatedInput externalValue={r1Value} setExternalValue={setR1Value} />
      <ValidatedInput externalValue={r2Value} setExternalValue={setR2Value} />
      <ValidatedInput externalValue={r3Value} setExternalValue={setR3Value} />
    </>
  );
}

export default App;
