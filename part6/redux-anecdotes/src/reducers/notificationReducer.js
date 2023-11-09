import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export default notificationSlice.reducer;

const { removeNotification } = notificationSlice.actions;
const internalSetNotification = notificationSlice.actions.setNotification;

let previousTimeoutId = null;

export const setNotification = (notification, timeout) => {
  return async (dispatch) => {
    if (previousTimeoutId !== null) {
      clearTimeout(previousTimeoutId);
    }
    dispatch(internalSetNotification(notification));
    previousTimeoutId = setTimeout(
      () => dispatch(removeNotification()),
      1000 * timeout
    );
  };
};
