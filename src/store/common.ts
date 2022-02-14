import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: boolean;
}

const initialState: InitialState = {
  isLoading: false
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading } = common.actions;

export default common.reducer;
