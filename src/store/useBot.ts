import { Bot, NewBot } from "scripts/interfaces";
import create from "zustand";

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
  stopLoss: 10,
  status: "WAITING"
};

interface BotState {
  botList: Bot[];
  newBot: NewBot;
  initNewBot: () => void;
  setNewBot: (payload: { key: string; value: any }) => void;
  createBot: (payload: NewBot) => void;
}

export const useBot = create<BotState>(set => ({
  botList: [],
  newBot: newBotInitialState,
  initNewBot: () =>
    set(state => ({
      newBot: { ...newBotInitialState }
    })),
  setNewBot: payload =>
    set(state => ({
      newBot: {
        ...state.newBot,
        [payload.key]: payload.value
      }
    })),
  createBot: payload => {
    console.log("createBot", payload);
  }
}));
