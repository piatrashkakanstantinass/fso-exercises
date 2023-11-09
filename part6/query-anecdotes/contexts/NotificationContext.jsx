/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "UNSET":
      return null;
  }
};

export function NotificationProvider({ children }) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  useEffect(() => {
    if (notification !== null) {
      const timeoutId = setTimeout(
        () => notificationDispatch({ type: "UNSET" }),
        5000
      );
      return () => clearTimeout(timeoutId);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
}
