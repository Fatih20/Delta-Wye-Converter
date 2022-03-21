import React, { useState, useContext, ReactChild } from "react";

import {
  componentUsedType,
  unitOfComponentUsedType,
  unitOfComponentInformation,
  conversionFunctionType,
} from "../utilities/types";

import { conversionFunction } from "../utilities/conversionLogic";

const ComponentUsedContext = React.createContext("R" as componentUsedType);
const SetComponentUsedContext = React.createContext(
  (arg0: componentUsedType) => {
    return;
  }
);

const UnitOfComponentUsedContext = React.createContext(
  "\u03A9" as unitOfComponentUsedType
);

const ConversionFunctionUsedContext = React.createContext((DtW: boolean) =>
  conversionFunction("R", DtW)
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

export function useConversionFunctionUsedContext() {
  return useContext(ConversionFunctionUsedContext);
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
          <ConversionFunctionUsedContext.Provider
            value={(DtW: boolean) => conversionFunction(componentUsed, DtW)}
          ></ConversionFunctionUsedContext.Provider>
          {children}
        </SetComponentUsedContext.Provider>
      </UnitOfComponentUsedContext.Provider>
    </ComponentUsedContext.Provider>
  );
}
