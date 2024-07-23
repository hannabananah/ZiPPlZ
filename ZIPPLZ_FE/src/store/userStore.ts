import { create } from 'zustand';

interface UserStoreState {
  userType: 'user' | 'worker';
  setUserType: (type: 'user' | 'worker') => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  userType: 'user',
  setUserType: (type) => set({ userType: type }),
}));

export default useUserStore;
