import { configureStore } from "@reduxjs/toolkit";
import botReducer from "./bot";
import commonReducer from "./common";

const store = configureStore({
  reducer: {
    common: commonReducer,
    bot: botReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
