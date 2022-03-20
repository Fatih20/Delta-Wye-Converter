import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";

import { inputConnectedVariable } from "../utilities/types";
import ValidatedInput from "./input";

import { VanillaButton } from "../GlobalComponent";

import deltaImage from "../images/DeltaCompressed.svg";
import wyeImage from "../images/WyeCompressed.svg";
import teeImage from "../images/TeeCompressed.svg";
import piImage from "../images/PiCompressed.svg";

import {
  deltaToWyeConverter,
  wyeToDeltaConverter,
} from "../utilities/conversionLogic";

interface IArrowContainer {
  convertingDtW: boolean;
}

interface INetworkButton {
  selected: boolean;
}

interface IDeltaInputContainer {
  isDelta: boolean;
}

interface IWyeInputContainer {
  isWye: boolean;
}

const Main = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
  position: relative;

  /* border: solid 1px white; */

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "delta arrow wye";
    grid-column-gap: 50px;
    justify-items: center;
  }

  /* Chrome, Safari, Edge, Opera */
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

const ArrowContainer = styled.div<IArrowContainer>`
  align-items: center;
  color: #d4d4d4;
  display: flex;
  height: 100%;
  justify-content: center;
  /* padding-top: 40px; */
  width: 100%;

  transform: rotate(
    ${({ convertingDtW }) => (convertingDtW ? "0deg" : "180deg")}
  );

  transition: transform 0.25s ease-in-out;
  & * {
    font-size: 4em;
    /* font-weight: 600; */
  }

  @media (min-width: 900px) {
    grid-area: arrow;
    transform: rotate(
      ${({ convertingDtW }) => (convertingDtW ? "270deg" : "90deg")}
    );
  }

  /* border: solid 1px white; */
`;

const DeltaWyeContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min(100%, 450px);
  @media (min-width: 900px) {
    width: min(100%, 600px);
  }

  /* border: solid 1px white; */
`;

const NetworkTypeChooser = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
  width: 100%;

  & button {
  }
`;

const NetworkButton = styled(VanillaButton)<INetworkButton>`
  border: solid 1px #000000;
  border-radius: 2px;
  background-color: #333333;
  color: ${({ selected }) => (selected ? "white" : "#abacae")};
  filter: drop-shadow(0 3px 5px #0000007a);
  padding: 5px 0;
  width: 50px;
`;

const DeltaContainer = styled(DeltaWyeContainer)`
  margin-bottom: 40px;
  @media (min-width: 900px) {
    grid-area: delta;
    margin-bottom: none;
  }
`;

const WyeContainer = styled(DeltaWyeContainer)`
  @media (min-width: 900px) {
    grid-area: wye;
  }
`;

const FieldContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5em;
  position: relative;
  width: min(100%, 450px);

  @media (min-width: 900px) {
    width: min(100%, 600px);
  }

  /* border: solid 1px white; */
`;

const InputContainer = styled.div`
  display: grid;
  height: 100%;
  justify-items: center;
  position: absolute;
  width: 100%;
  z-index: 10;

  & input {
    align-self: center;
    width: min(100%, 200px);
    height: 2.25em;

    /* @media (min-width: 600px) {
      height: 3.5em;
      font-size: 1em;
    } */
  }
`;

const DeltaFieldContainer = styled(FieldContainer)`
  /* border: solid 1px white; */
`;

const WyeFieldContainer = styled(FieldContainer)`
  /* border: solid 1px white; */
`;

const DeltaInputArrangement = css`
  grid-template-columns: 12.5% 1fr 1fr 1fr 12.5%;
  grid-template-rows: 1fr 20% 1fr 1fr 33%;
  grid-template-areas:
    ". . ra . ."
    ". . . . ."
    ". rb . rc ."
    ". rb . rc ."
    ". . . . .";
`;

const PiInputArrangement = css`
  grid-template-columns: 1fr 12.5% 1fr 12.5% 1fr;
  grid-template-rows: 1fr 20% 1fr 1fr 33%;
  grid-template-areas:
    ". . ra . ."
    ". . . . ."
    "rb . . . rc"
    "rb . . . rc"
    ". . . . .";
`;

const DeltaInputContainer = styled(InputContainer)<IDeltaInputContainer>`
  ${({ isDelta }) => (isDelta ? DeltaInputArrangement : PiInputArrangement)};

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

const WyeInputArrangement = css`
  grid-template-columns: 16% 1fr 1fr 1fr 16%;
  grid-template-rows: 6% 1fr 20% 1fr 20%;
  grid-template-areas:
    ". . . . ."
    ". r1 . r2 ."
    ". . . . ."
    ". . r3 . ."
    ". . . . .";
`;

const TeeInputArrangement = css`
  grid-template-columns: 16% 1fr 1fr 1fr 16%;
  grid-template-rows: 1fr 20% 2fr 33%;
  grid-template-areas:
    ". r1 . r2 ."
    ". . . . ."
    ". . r3 . ."
    ". . . . ."
    ". . . . .";
`;

const WyeInputContainer = styled(InputContainer)<IWyeInputContainer>`
  ${({ isWye }) => (isWye ? WyeInputArrangement : TeeInputArrangement)};
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

  const [isWye, setIsWye] = useState(true);
  const [isDelta, setIsDelta] = useState(true);

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
      <DeltaContainer>
        <NetworkTypeChooser>
          <NetworkButton selected={isDelta} onClick={() => setIsDelta(true)}>
            Delta
          </NetworkButton>
          <NetworkButton selected={!isDelta} onClick={() => setIsDelta(false)}>
            Pi
          </NetworkButton>
        </NetworkTypeChooser>
        <DeltaFieldContainer>
          <SVGContainer>
            <img
              src={isDelta ? deltaImage : piImage}
              alt={`3 resistors arranged in ${isDelta ? "delta" : "pi"}`}
            />
          </SVGContainer>
          <DeltaInputContainer isDelta={isDelta}>
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
      </DeltaContainer>
      <ArrowContainer convertingDtW={convertingDtW}>
        <FontAwesomeIcon icon={faArrowDownLong} />
      </ArrowContainer>
      <WyeContainer>
        <NetworkTypeChooser>
          <NetworkButton selected={isWye} onClick={() => setIsWye(true)}>
            Wye
          </NetworkButton>
          <NetworkButton selected={!isWye} onClick={() => setIsWye(false)}>
            Tee
          </NetworkButton>
        </NetworkTypeChooser>
        <WyeFieldContainer>
          <SVGContainer>
            <img
              src={isWye ? wyeImage : teeImage}
              alt={`3 resistors arranged in ${isWye ? "wye" : "tee"}`}
            />
          </SVGContainer>
          <WyeInputContainer isWye={isWye}>
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
        </WyeFieldContainer>
      </WyeContainer>
    </Main>
  );
}
