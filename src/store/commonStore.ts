import { create } from 'zustand';

export interface CommonStoreStatesProps {
  refreshBalance: boolean;
  setRefreshBalance: (value: boolean) => void;
  refreshCart: boolean;
  setRefreshCart: (value: boolean) => void;
}

export const useCommonStore = create<CommonStoreStatesProps>((set) => ({
  refreshBalance: false,
  setRefreshBalance: (value: boolean) => set({ refreshBalance: value }),

  refreshCart: false,
  setRefreshCart: (value: boolean) => set({ refreshCart: value }),
}));