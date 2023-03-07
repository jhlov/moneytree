import { Bot } from "scripts/interfaces";
import create from "zustand";

const newBotInitialState: Bot = {
  account: "",
  stock: "TQQQ",
  type: "IBv2.1",
  name: "",
  seed: 1000,
  days: 40,
  stopLossDays: 40,
  fee: 0.25,
  start: true,
  startNextCycle: true,
  reinvestment: 0,
  stopLoss: "QUARTER_STOP_LOSS",
  status: "WAITING"
};

interface BotState {
  botList: Bot[];
  newBot: Bot;
  initNewBot: () => void;
  setNewBot: (payload: { key: string; value: any }) => void;
  createBot: (payload: Bot) => void;
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
