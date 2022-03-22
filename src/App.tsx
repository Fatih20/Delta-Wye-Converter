import styled from "styled-components";

import { GlobalTransition } from "./GlobalComponent";
import MainConversion from "./components/main";
import Header from "./components/header";
import ControlPanel from "./components/controlPanel";
import DecimalPlaceContextProvider from "./context/decimalPlace";
import ComponentUsedContextProvider from "./context/componentUsed";
import InitialStateContextProvider from "./context/initialState";

const Main = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: relative;
`;

const ControlPanelContainer = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
  bottom: 0;
  color: white;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
`;

function App() {
  return (
    <>
      <GlobalTransition />
      <Main>
        <InitialStateContextProvider>
          <ComponentUsedContextProvider>
            <DecimalPlaceContextProvider>
              <ControlPanelContainer>
                <p>Bruh</p>
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
