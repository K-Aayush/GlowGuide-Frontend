import React, { createContext, useState, useEffect, ReactNode } from "react";

import { UserData, SkinProfileData } from "../lib/types";
import authService from "../api/services/authService";

interface AppContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  backendUrl: string;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  skinProfile: SkinProfileData | null;
  setSkinProfile: React.Dispatch<React.SetStateAction<SkinProfileData | null>>;
  isAuthenticated: boolean;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userData, setUserData] = useState<UserData | null>(
    authService.getCurrentUser()
  );
  const [skinProfile, setSkinProfile] = useState<SkinProfileData | null>(null);

  const isAuthenticated = !!token && !!userData;

  const logout = () => {
    authService.logout();
    setToken(null);
    setUserData(null);
    setSkinProfile(null);
  };

  // Load user data from localStorage on initial mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    if (storedToken && storedUserData) {
      setToken(storedToken);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    skinProfile,
    setSkinProfile,
    isAuthenticated,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
