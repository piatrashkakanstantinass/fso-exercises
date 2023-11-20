import { useEffect, useState } from "react";
import TokenContext from "./TokenContext";
import { useApolloClient } from "@apollo/client";

export default function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("user-token"));
  const client = useApolloClient();

  useEffect(() => {
    client.resetStore();
    if (!token) {
      localStorage.removeItem("user-token");
    } else {
      localStorage.setItem("user-token", token);
    }
  }, [token, client]);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
}
