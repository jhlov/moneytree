import { Grade } from "./types";

export interface GetUserInfoResponse {
  grade: Grade;
  KIAppKey: string;
  KIAppSecret: string;
  error?: string;
}

export interface UpdateUserInfoResponse {
  KIAppKey: string;
  KIAppSecret: string;
  error?: string;
}

export interface TestKIResponse {
  error?: string;
}
