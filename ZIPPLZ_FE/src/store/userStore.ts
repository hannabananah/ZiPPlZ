import { create } from 'zustand';

interface UserStoreState {
  userType: 'user' | 'worker';
  setUserType: (type: 'user' | 'worker') => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  userType: 'user',
  setUserType: (type) => set({ userType: type }),
}));
