import { createContext } from "react";
import { userDataProps } from "../lib/data";

interface AppContextType {
  backendUrl: string;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userData: userDataProps | null;
  setUserData: React.Dispatch<React.SetStateAction<userDataProps | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValues: AppContextType = {
  backendUrl: "",
  token: "",
  setToken: () => {},
  userData: null,
  setUserData: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValues);
