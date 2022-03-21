import React, { useState, useContext, ReactChild } from "react";

const DecimalPlaceContext = React.createContext(5);

export function useDecimalPlaceContext() {
  return useContext(DecimalPlaceContext);
}

export default function DecimalPlaceContextProvider({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
  const [decimalPlace, setDecimalPlace] = useState(5);
  return (
    <DecimalPlaceContext.Provider value={decimalPlace}>
      {children}
    </DecimalPlaceContext.Provider>
  );
}
