import styled, { createGlobalStyle } from "styled-components";

export const GlobalTransition = createGlobalStyle`
    
    * {
        transition: color 0.2s, background-color 0.2s;
    }

    select {
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;
  // Additional resets for further consistency
  background-color: transparent;
  border: none;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
}
`;

export const VanillaButton = styled.button`
  display: inline-block;
  border: none;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  margin: 0;
  text-decoration: none;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0;
`;
