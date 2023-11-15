import { useEffect, useReducer } from "react";
import UserContext from "./UserContext";
import blogService from "../services/blogs";

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "UNSET":
      return null;
    default:
      return state;
  }
}

export default function UserProvider({ children }) {
  const [user, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("user")),
  );

  useEffect(() => {
    if (user !== null) {
      blogService.setToken(user.token);
    }
  }, [user]);

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
}
