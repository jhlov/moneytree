export type BotType = "IBv1" | "IBv2" | "IBv2.1";
export type BotStatus = "WAITING" | "RUNNING" | "PAUSE";

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
  account: string; // 계좌
  stock: string; // 종목
  type: BotType; // 전략 종류
  name: string; // 봇 이름
  seed: number; // 투자금
  days: number; // 무한매수 분할일
  fee: number; // 수수료
  start: boolean; // 생성 후 바로 시작할지 여부
  startNextCycle: boolean; // 싸이클 종료 후 다시 시작할지 여부
  reinvestment: number; // 재투자 비율
  stopLoss: number; // 손절 비율
  status: BotStatus;
}
