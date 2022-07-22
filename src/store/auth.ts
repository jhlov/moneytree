import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLogin: boolean;
  userEmail: string;
}

const initialState: InitialState = {
  isLogin: false,
  userEmail: ""
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin: (state, action: { payload: boolean }) => {
      state.isLogin = action.payload;
    },
    setUserEmail: (state, action: { payload: string }) => {
      state.userEmail = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setIsLogin, setUserEmail } = auth.actions;

export default auth.reducer;
