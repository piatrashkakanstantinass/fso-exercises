import { createContext, useContext } from "react";

const NotificationContext = createContext([null, () => {}]);

export default NotificationContext;

export function useNotification() {
  return useContext(NotificationContext);
}

export function setNotification(message) {
  return { type: "SET", payload: message };
}

export function unsetNotification() {
  return { type: "UNSET" };
}
