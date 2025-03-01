import { AppContext } from "./AppContext";
import React, { useState } from "react";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //get token and userdata
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

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
