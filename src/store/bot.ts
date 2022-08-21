import { createSlice } from "@reduxjs/toolkit";
import { Bot, NewBot } from "scripts/interfaces";

interface InitialState {
  botList: Bot[];
  newBot: NewBot;
}

const newBotInitialState: NewBot = {
  account: "",
  stock: "TQQQ",
  type: "IBv2.1",
  name: "",
  seed: 1000,
  days: 40,
  fee: 0.25,
  start: true,
  startNextCycle: true,
  reinvestment: 0,
  stopLoss: 10
};

const initialState: InitialState = {
  botList: [],
  newBot: newBotInitialState
};

export const config = createSlice({
  name: "bot",
  initialState,
  reducers: {
    initNewBot: state => {
      state.newBot = { ...newBotInitialState };
    },
    setNewBot: (state, action: { payload: { key: string; value: any } }) => {
      console.log("setNewBot", action.payload.key, action.payload.value);
      state.newBot = {
        ...state.newBot,
        [action.payload.key]: action.payload.value
      };
    }
  }
});

// Action creators are generated for each case reducer function
export const { initNewBot, setNewBot } = config.actions;

export default config.reducer;
