import React, { ReactChild, useState, useContext } from "react";

const InitialStateContext = React.createContext([
  true,
  (arg0: boolean) => {
    return;
  },
] as [boolean, (arg0: boolean) => void]);

export function useInitialStateContext() {
  return useContext(InitialStateContext);
}

export default function InitialStateContextProvider({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
  const [initialState, setInitialState] = useState(true);
  return (
    <InitialStateContext.Provider value={[initialState, setInitialState]}>
      {children}
    </InitialStateContext.Provider>
  );
}
