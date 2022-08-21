export type BotType = "IBv1" | "IBv2" | "IBv2.1";

export interface Account {
  id?: number;
  account: string;
  name: string;
}

export interface Bot {
  type: BotType;
  name: string;
  seed: number;
  days: number;
}

export interface NewBot {
  type: BotType;
  name: string;
  seed: number;
  days: number;
}