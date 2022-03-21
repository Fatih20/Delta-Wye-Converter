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
`;

function App() {
  return (
    <>
      <GlobalTransition />
      <Main>
        <InitialStateContextProvider>
          <ComponentUsedContextProvider>
            <DecimalPlaceContextProvider>
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
