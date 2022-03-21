import React, { useState, useContext, ReactChild } from "react";

import {
  componentUsedType,
  unitOfComponentUsedType,
  unitOfComponentInformation,
} from "../utilities/types";

const ComponentUsedContext = React.createContext("R" as componentUsedType);
const SetComponentUsedContext = React.createContext(
  (arg0: componentUsedType) => {
    return;
  }
);

const UnitOfComponentUsedContext = React.createContext(
  "\u03A9" as unitOfComponentUsedType
);

export function useComponentUsedContext() {
  return useContext(ComponentUsedContext);
}

export function useSetComponentUsedContext() {
  return useContext(SetComponentUsedContext);
}

export function useUnitOfComponentUsedContext() {
  return useContext(UnitOfComponentUsedContext);
}

export default function ComponentUsedContextProvider({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
  const [componentUsed, setComponentUsed] = useState("R" as componentUsedType);
  return (
    <ComponentUsedContext.Provider value={componentUsed}>
      <UnitOfComponentUsedContext.Provider
        value={unitOfComponentInformation(componentUsed)}
      >
        <SetComponentUsedContext.Provider
          value={(newComponentUsed: componentUsedType) =>
            setComponentUsed(newComponentUsed)
          }
        >
          {children}
        </SetComponentUsedContext.Provider>
      </UnitOfComponentUsedContext.Provider>
    </ComponentUsedContext.Provider>
  );
}
