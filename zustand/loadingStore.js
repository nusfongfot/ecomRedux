import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  isLoading: false,
  startLoading: () =>
    set((state) => ({
      ...state,
      isLoading: true,
    })),
  stopLoading: () =>
    set((state) => ({
      ...state,
      isLoading: false,
    })),
}));
