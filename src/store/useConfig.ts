import { Account } from "scripts/interfaces";
import { UpdateUserInfoResponse } from "scripts/responses";
import { api } from "services/api";
import create from "zustand";

interface ConfigState {
  KIAccounts: Account[];
  KIAppKey: string;
  KIAppSecret: string;
  setKIAccounts: (payload: Account[]) => void;
  setKIAppKey: (payload: string) => void;
  setKIAppSecret: (payload: string) => void;
  updateUserInfo: (
    KIAccounts: Partial<Account>[],
    KIAppKey: string,
    KIAppSecret: string
  ) => void;
}

export const useConfig = create<ConfigState>(set => ({
  KIAccounts: [],
  KIAppKey: "",
  KIAppSecret: "",
  setKIAccounts: payload => {
    set(state => ({
      KIAccounts: payload
    }));
  },
  setKIAppKey: payload => {
    set(state => ({
      KIAppKey: payload
    }));
  },
  setKIAppSecret: payload => {
    set(state => ({
      KIAppSecret: payload
    }));
  },
  updateUserInfo: async (
    KIAccounts: Partial<Account>[],
    KIAppKey: string,
    KIAppSecret: string
  ) => {
    const r = await api.put<UpdateUserInfoResponse>(
      "https://y7o6ds9rka.execute-api.ap-northeast-2.amazonaws.com/default/mt-update-userinfo",
      {
        KIAccounts,
        KIAppKey,
        KIAppSecret
      }
    );

    if (r.data.error) {
      alert(r.data.error);
    } else {
      set(state => ({
        KIAccounts: r.data.KIAccounts,
        KIAppKey: r.data.KIAppKey,
        KIAppSecret: r.data.KIAppSecret
      }));

      alert("환경설정 수정 성공");
    }
  }
}));
