import { createSlice } from "@reduxjs/toolkit";
import { Bot, NewBot } from "scripts/interfaces";

interface InitialState {
  botList: Bot[];
  newBot: NewBot;
}

const newBotInitialState: NewBot = {
  type: "IBv2.1",
  name: "",
  seed: 1000,
  days: 40
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
    // setKIAppKey: (state, action: { payload: string }) => {
    //   state.KIAppKey = action.payload;
    // },
    // setKIAppSecret: (state, action: { payload: string }) => {
    //   state.KIAppSecret = action.payload;
    // }
  }
});

// Action creators are generated for each case reducer function
export const { initNewBot, setNewBot } = config.actions;

export default config.reducer;
