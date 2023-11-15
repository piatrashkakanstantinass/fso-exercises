import { createContext, useContext } from "react";

const UserContext = createContext();

export default UserContext;

export function useUser() {
  return useContext(UserContext);
}

export function setUser(data) {
  return { type: "SET", payload: data };
}

export function unsetUser() {
  return { type: "UNSET" };
}
