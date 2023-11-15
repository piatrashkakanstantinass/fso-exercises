import { useEffect, useReducer } from "react";
import NotificationContext, { unsetNotification } from "./NotificationContext";

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

export default function NotificationProvider({ children }) {
  const [notification, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    console.log(notification);
    if (notification === null) {
      return;
    }
    const timeoutId = setTimeout(() => dispatch(unsetNotification()), 5000);
    return () => clearTimeout(timeoutId);
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
}
