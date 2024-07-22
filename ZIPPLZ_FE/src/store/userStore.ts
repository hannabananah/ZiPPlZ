import { create } from 'zustand';

export const useCounterStore = create((set) => ({
  count: 1,
  increse: () => set((state) => ({ count: state.count + 1 })),
}));
