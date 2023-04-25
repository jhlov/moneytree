export type BotType = "IBv1" | "IBv2" | "IBv2.1" | "0458";
export type BotStatus = "PAUSE" | "RUNNING";
export type StopLossStatus = "QUARTER_STOP_LOSS" | "NONE";

export interface Account {
  id?: number;
  account: string;
  name: string;
}

export interface Bot {
  account: string; // 계좌
  stock: string; // 종목
  type: BotType; // 전략 종류
  name: string; // 봇 이름
  seed: number; // 투자금
  days: number; // 분할일(무한매수, 떨사오팔)
  stopLossDays: number; // 손절일(떨사오팔)
  fee: number; // 수수료
  startNextCycle: boolean; // 싸이클 종료 후 다시 시작할지 여부(무한매수)
  reinvestment: number; // 재투자 비율
  stopLoss: StopLossStatus; // 손절방법 (무한매수)
  status: BotStatus;
}
