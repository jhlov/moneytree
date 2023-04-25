import _ from "lodash";
import { Bot } from "scripts/interfaces";
import { api } from "services/api";
import create from "zustand";

const newBotInitialState: Bot = {
  account: "",
  stock: "TQQQ",
  type: "0458",
  name: "",
  seed: 1000,
  days: 40,
  stopLossDays: 40,
  fee: 0.25,
  startNextCycle: true,
  reinvestment: 0,
  stopLoss: "QUARTER_STOP_LOSS",
  status: "PAUSE"
};

interface BotState {
  botList: Bot[];
  newBot: Bot;
  initNewBot: () => void;
  setNewBot: (key: string, value: any) => void;
  createBot: (newBot: Bot) => Promise<any>;
}

export const useBot = create<BotState>(set => ({
  botList: [],
  newBot: newBotInitialState,
  initNewBot: () =>
    set(state => ({
      newBot: { ...newBotInitialState }
    })),
  setNewBot: (key, value) =>
    set(state => ({
      newBot: {
        ...state.newBot,
        [key]: value
      }
    })),
  createBot: async newBot => {
    console.log("createBot", newBot);

    let pick: string[] = [];
    if (newBot.type === "0458") {
      pick = [
        "account",
        "stock",
        "type",
        "name",
        "seed",
        "days",
        "stopLossDays",
        "fee",
        "reinvestment",
        "status"
      ];
    }

    // api 호출
    const r = await api.post(
      "https://blvxmzhwn3.execute-api.ap-northeast-2.amazonaws.com/default/mt-create-bot",
      {
        newBot: _.pick(newBot, pick)
      }
    );

    // TODO: 에러 체크

    console.log(r);

    return Promise.resolve();
  }
}));
