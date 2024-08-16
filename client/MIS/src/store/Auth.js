import { createContext, useContext } from "react";

export const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};
