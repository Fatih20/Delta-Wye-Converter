import styled, { css } from "styled-components";
import { useState } from "react";

import { GlobalTransition, VanillaButton } from "./GlobalComponent";
import MainConversion from "./components/main";
import Header from "./components/header";
import ControlPanel from "./components/controlPanel";
import DecimalPlaceContextProvider from "./context/decimalPlace";
import ComponentUsedContextProvider from "./context/componentUsed";
import InitialStateContextProvider from "./context/initialState";

interface IControlPanelContainer {
  isOpen: boolean;
}

const Main = styled.div`
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: relative;
  padding-bottom: 20px;
`;

const ClosedControlPanel = css`
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
`;

const OpenControlPanel = css`
  background: linear-gradient(
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.75) 50%,
    rgba(0, 0, 0, 0.9)
  );
  pointer-events: auto;
`;

const ControlPanelContainer = styled.div<IControlPanelContainer>`
  align-items: center;
  box-sizing: border-box;
  color: white;
  display: flex;
  height: 100vh;
  justify-content: flex-end;
  flex-direction: column;
  gap: 20px;
  left: 0;
  padding: 1em;
  position: fixed;
  right: 0;
  z-index: 20;

  @media (min-width: 900px) {
    display: none;
  }

  ${({ isOpen }) =>
    isOpen
      ? OpenControlPanel
      : ClosedControlPanel}/* border: solid 1px white; */
`;

const ControlPanelButton = styled(VanillaButton)`
  border: solid 1px #000000;
  border-radius: 5px;
  background-color: white;
  color: #333333;
  filter: drop-shadow(0 3px 10px #000000ed);
  font-size: 1em;
  padding: 7px;
  pointer-events: auto;
`;

function App() {
  const [controlPanelOpen, setControlPanelOpen] = useState(false);
  return (
    <>
      <GlobalTransition />
      <Main>
        <InitialStateContextProvider>
          <ComponentUsedContextProvider>
            <DecimalPlaceContextProvider>
              <ControlPanelContainer isOpen={controlPanelOpen}>
                <ControlPanel
                  mobileControlPanelOpen={controlPanelOpen}
                  isForMobile={true}
                />
                <ControlPanelButton
                  onClick={() =>
                    setControlPanelOpen((prevControlPanel) => !prevControlPanel)
                  }
                >
                  {controlPanelOpen ? "Close" : "Options"}
                </ControlPanelButton>
              </ControlPanelContainer>
              <Header />
              <ControlPanel mobileControlPanelOpen={true} isForMobile={false} />
              <MainConversion />
            </DecimalPlaceContextProvider>
          </ComponentUsedContextProvider>
        </InitialStateContextProvider>
      </Main>
    </>
  );
}

export default App;
