import styled from "styled-components";

import { GlobalTransition } from "./GlobalComponent";
import MainConversion from "./components/main";
import Header from "./components/header";
import ControlPanel from "./components/controlPanel";
import DecimalPlaceContextProvider from "./context/decimalPlace";

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
        <DecimalPlaceContextProvider>
          <Header />
          <ControlPanel />
          <MainConversion />
        </DecimalPlaceContextProvider>
      </Main>
    </>
  );
}

export default App;
