import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification !== null) {
      const timeoutId = setTimeout(() => dispatch(removeNotification()), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, notification]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 10,
  };
  return notification !== null && <div style={style}>{notification}</div>;
};

export default Notification;
