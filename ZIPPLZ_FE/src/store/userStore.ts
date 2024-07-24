import { create } from 'zustand';

interface User {
  userSerial: number;
  fileSerial: number;
  email: string;
  password: string;
  userName: string;
  tel: string;
  birthDate: Date;
  delYn: number;
}

interface Worker extends User {
  workerSerial: number;
  specialty: string;
  location: string;
  company: string;
  companyAddress: string;
  businessNumber: string;
  certificate: string;
  hasAsBadge: number;
}

interface Customer extends User {
  customerSerial: number;
  nickname: string;
  currentAddress: string;
}

interface UserStoreState {
  userType: 'user' | 'worker';
  user: User | null;
  worker: Worker | null;
  customer: Customer | null;
  setUserType: (role: 'user' | 'worker') => void;
  setUser: (user: User | null) => void;
  setWorker: (worker: Worker | null) => void;
  setCustomer: (customer: Customer | null) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  userType: 'user',
  user: null,
  worker: null,
  customer: null,
  setUserType: (role) => set({ userType: role }),
  setUser: (user) => set({ user }),
  setWorker: (worker) => set({ worker }),
  setCustomer: (customer) => set({ customer }),
}));
