import { createContext, useContext } from "react";

const TokenContext = createContext();
export default TokenContext;

export function useToken() {
  return useContext(TokenContext)[0];
}

export function useSetToken() {
  return useContext(TokenContext)[1];
}
