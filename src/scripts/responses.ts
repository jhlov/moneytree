import { Account } from "./interfaces";
import { Grade } from "./types";

export interface GetUserInfoResponse {
  grade: Grade;
  KIAccounts: Account[];
  KIAppKey: string;
  KIAppSecret: string;
  error?: string;
}

export interface UpdateUserInfoResponse {
  KIAccounts: Account[];
  KIAppKey: string;
  KIAppSecret: string;
  error?: string;
}

export interface TestKIResponse {
  error?: string;
}
