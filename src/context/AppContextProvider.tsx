import { userDataProps } from "../lib/data";
import { AppContext } from "./AppContext";
import React, { useState } from "react";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //get token and userdata
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<userDataProps | null>(null);

  const value = {
    isLoading,
    setIsLoading,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
