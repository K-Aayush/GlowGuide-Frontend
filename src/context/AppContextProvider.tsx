import { AppContext } from "./AppContext";
import React from "react";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
