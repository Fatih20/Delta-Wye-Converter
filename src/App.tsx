import styled from "styled-components";

import { GlobalTransition } from "./GlobalComponent";
import MainConversion from "./components/main";
import Header from "./components/header";

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
        <Header />
        <MainConversion />
      </Main>
    </>
  );
}

export default App;
