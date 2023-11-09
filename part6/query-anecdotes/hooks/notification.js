import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export function useNotification() {
  return useContext(NotificationContext)[0];
}

export function useNotificationDispatch() {
  return useContext(NotificationContext)[1];
}
