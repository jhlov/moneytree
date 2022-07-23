import { createSlice } from "@reduxjs/toolkit";
import { Grade } from "scripts/types";

interface InitialState {
  grade: Grade;
  isLogin: boolean;
  userEmail: string;
}

const initialState: InitialState = {
  grade: "NOT_LOGIN",
  isLogin: false,
  userEmail: ""
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setGrade: (state, action: { payload: Grade }) => {
      state.grade = action.payload;
    },
    setIsLogin: (state, action: { payload: boolean }) => {
      state.isLogin = action.payload;
    },
    setUserEmail: (state, action: { payload: string }) => {
      state.userEmail = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setGrade, setIsLogin, setUserEmail } = auth.actions;

export default auth.reducer;
