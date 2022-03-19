import styled from "styled-components";

const Main = styled.div`
  align-items: center;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em 1em;

  & * {
    text-align: center;
  }
`;

const Title = styled.h1`
  /* font-size: 1.75em; */
`;

export default function Header() {
  return (
    <Main>
      <Title>Delta to Wye Converter</Title>
    </Main>
  );
}
