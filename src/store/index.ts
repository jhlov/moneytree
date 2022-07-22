import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import commonReducer from "./common";

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
