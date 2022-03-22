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
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: relative;
`;

const ClosedControlPanel = css`
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
`;

const OpenControlPanel = css`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
  pointer-events: auto;
`;

const ControlPanelContainer = styled.div<IControlPanelContainer>`
  box-sizing: border-box;
  color: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: 1em;
  position: fixed;
  right: 0;
  z-index: 20;

  ${({ isOpen }) =>
    isOpen
      ? OpenControlPanel
      : ClosedControlPanel}/* border: solid 1px white; */
`;

const ControlPanelButton = styled(VanillaButton)`
  align-self: flex-end;
  border: solid 1px #000000;
  border-radius: 5px;
  background-color: white;
  color: #333333;
  filter: drop-shadow(0 3px 5px #0000007a);
  font-size: 1em;
  padding: 7px;
  pointer-events: auto;
`;

function App() {
  const [controlPanelOpen, setControlPanelOpen] = useState(true);
  return (
    <>
      <GlobalTransition />
      <Main>
        <InitialStateContextProvider>
          <ComponentUsedContextProvider>
            <DecimalPlaceContextProvider>
              <ControlPanelContainer isOpen={controlPanelOpen}>
                <ControlPanelButton
                  onClick={() =>
                    setControlPanelOpen((prevControlPanel) => !prevControlPanel)
                  }
                >
                  {controlPanelOpen ? "Close" : "Options"}
                </ControlPanelButton>
              </ControlPanelContainer>
              <Header />
              <ControlPanel />
              <MainConversion />
            </DecimalPlaceContextProvider>
          </ComponentUsedContextProvider>
        </InitialStateContextProvider>
      </Main>
    </>
  );
}

export default App;
