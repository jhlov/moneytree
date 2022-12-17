import { Grade } from "scripts/types";
import create from "zustand";

interface AuthState {
  grade: Grade;
  isLogin: boolean;
  userEmail: string;
  setGrade: (payload: Grade) => void;
  setIsLogin: (payload: boolean) => void;
  setUserEmail: (payload: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  grade: "NOT_LOGIN",
  isLogin: false,
  userEmail: "",
  setGrade: payload =>
    set(state => ({
      grade: payload
    })),
  setIsLogin: payload =>
    set(state => ({
      isLogin: payload
    })),
  setUserEmail: payload =>
    set(state => ({
      userEmail: payload
    }))
}));
