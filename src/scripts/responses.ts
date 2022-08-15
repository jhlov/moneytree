import { Grade } from "./types";

export interface GetUserInfoResponse {
  grade: Grade;
  error?: string;
}

export interface UpdateUserInfoResponse {
  KIAppKey: string;
  KIAppSecret: string;
  error?: string;
}
