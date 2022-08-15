import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import commonReducer from "./common";
import configReducer from "./config";

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    config: configReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
