import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Redux-RootReducer";

const isLocalHost = window.location.hostname === "localhost";

const store = configureStore({
  reducer: rootReducer,
  devTools: isLocalHost,
});

export default store;


