import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LoginUser {
  userSerial: number;
  email: string;
  role: string;
}

interface useLoginUserStore {
  loginUser: LoginUser | null;
  isLogin: boolean;
  setLoginUser: (loginUser: LoginUser | null) => void;
  setIsLogin: (isLogin: boolean) => void;
}
export const useLoginUserStore = create<useLoginUserStore>()(
  persist(
    (set) => ({
      loginUser: null,
      isLogin: false,
      setLoginUser: (loginUser) => set({ loginUser }),
      setIsLogin: (isLogin) => set({ isLogin }),
    }),
    {
      name: 'login-user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
