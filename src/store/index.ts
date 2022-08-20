import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import botReducer from "./bot";
import commonReducer from "./common";
import configReducer from "./config";

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    config: configReducer,
    bot: botReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
