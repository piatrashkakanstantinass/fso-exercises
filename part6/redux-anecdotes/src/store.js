import { configureStore } from "@reduxjs/toolkit";
import { anecdoteReducer, filterReducer } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});
