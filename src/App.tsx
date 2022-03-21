import styled from "styled-components";

import { GlobalTransition } from "./GlobalComponent";
import MainConversion from "./components/main";
import Header from "./components/header";
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
          <MainConversion />
        </DecimalPlaceContextProvider>
      </Main>
    </>
  );
}

export default App;
