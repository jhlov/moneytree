import create from "zustand";

interface CommonState {
  isLoading: boolean;
  setLoading: (payload: boolean) => void;
}

export const useCommon = create<CommonState>(set => ({
  isLoading: false,
  setLoading: payload =>
    set(state => ({
      isLoading: payload
    }))
}));
