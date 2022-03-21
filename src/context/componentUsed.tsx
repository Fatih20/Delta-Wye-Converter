import React, { useState, useContext, ReactChild } from "react";

import { componentUsedType } from "../utilities/types";

const ComponentUsedContext = React.createContext("R" as componentUsedType);
const SetComponentUsedContext = React.createContext(
  (arg0: componentUsedType) => {
    return;
  }
);
export function useComponentUsedContext() {
  return useContext(ComponentUsedContext);
}

export function useSetComponentUsedContext() {
  return useContext(SetComponentUsedContext);
}

export default function ComponentUsedContextProvider({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
  const [componentUsed, setComponentUsed] = useState("R" as componentUsedType);
  return (
    <ComponentUsedContext.Provider value={componentUsed}>
      <SetComponentUsedContext.Provider
        value={(newComponentUsed: componentUsedType) =>
          setComponentUsed(newComponentUsed)
        }
      >
        {children}
      </SetComponentUsedContext.Provider>
    </ComponentUsedContext.Provider>
  );
}
