import React, { useState, useContext, ReactChild } from "react";

const DecimalPlaceContext = React.createContext(5);
const SetDecimalPlaceContext = React.createContext((arg0: number) => {
  return;
});
export function useDecimalPlaceContext() {
  return useContext(DecimalPlaceContext);
}

export function useSetDecimalPlaceContext() {
  return useContext(SetDecimalPlaceContext);
}

export default function DecimalPlaceContextProvider({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
  const [decimalPlace, setDecimalPlace] = useState(6);
  return (
    <DecimalPlaceContext.Provider value={decimalPlace}>
      <SetDecimalPlaceContext.Provider
        value={(newDecimalPlace: number) => setDecimalPlace(newDecimalPlace)}
      >
        {children}
      </SetDecimalPlaceContext.Provider>
    </DecimalPlaceContext.Provider>
  );
}
