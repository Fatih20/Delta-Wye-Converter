import styled from "styled-components";

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
    <Main>
      <Header />
      <MainConversion />
    </Main>
  );
}

export default App;
