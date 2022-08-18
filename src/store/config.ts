import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateUserInfoResponse } from "scripts/responses";
import { api } from "services/api";

interface InitialState {
  KIAppKey: string;
  KIAppSecret: string;
}

const initialState: InitialState = {
  KIAppKey: "",
  KIAppSecret: ""
};

export const updateUserInfo = createAsyncThunk(
  "updateUserInfo",
  async ({
    KIAppKey,
    KIAppSecret
  }: {
    KIAppKey: string;
    KIAppSecret: string;
  }) => {
    const r = await api.put<UpdateUserInfoResponse>(
      "https://y7o6ds9rka.execute-api.ap-northeast-2.amazonaws.com/default/mt-update-userinfo",
      {
        KIAppKey,
        KIAppSecret
      }
    );

    return r.data;
  }
);

export const config = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setKIAppKey: (state, action: { payload: string }) => {
      state.KIAppKey = action.payload;
    },
    setKIAppSecret: (state, action: { payload: string }) => {
      state.KIAppSecret = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      console.log("updateUserInfo");
      if (action.payload.error) {
        alert(action.payload.error);
      } else {
        state.KIAppKey = action.payload.KIAppKey;
        state.KIAppSecret = action.payload.KIAppSecret;
        alert("환경설정 수정 성공");
      }
    });
  }
});

// Action creators are generated for each case reducer function
export const { setKIAppKey, setKIAppSecret } = config.actions;

export default config.reducer;
