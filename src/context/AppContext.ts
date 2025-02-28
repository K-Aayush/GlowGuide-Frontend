import { createContext } from "react";

interface AppContextType {}

const defaultValues: AppContextType = {};

export const AppContext = createContext<AppContextType>(defaultValues);
