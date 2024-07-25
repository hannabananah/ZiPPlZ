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
  userType: 'user' | 'worker' | 'customer';
  user: User | null;
  worker: Worker | null;
  customer: Customer | null;
  setUserType: (role: 'user' | 'worker' | 'customer') => void;
  setUser: (user: User | null) => void;
  setWorker: (worker: Worker | null) => void;
  setCustomer: (customer: Customer | null) => void;
}

// 목업 데이터 임시사용
const defaultUser: User = {
  userSerial: 1,
  fileSerial: 101,
  email: 'user@example.com',
  password: 'password123',
  userName: '김철수',
  tel: '010-1234-5678',
  birthDate: new Date('1990-01-01'),
  delYn: 0,
};

const defaultWorker: Worker = {
  ...defaultUser,
  workerSerial: 201,
  specialty: '소프트웨어 엔지니어',
  location: '서울',
  company: '테크코리아',
  companyAddress: '서울특별시 강남구 테헤란로 123',
  businessNumber: '123-45-67890',
  certificate: '전문가 인증서',
  hasAsBadge: 1,
};

const defaultCustomer: Customer = {
  ...defaultUser,
  customerSerial: 301,
  nickname: '홍길동',
  currentAddress: '부산광역시 해운대구 우동 456',
};

export const useUserStore = create<UserStoreState>((set) => ({
  userType: 'user',
  user: defaultUser,
  worker: null,
  customer: null,
  setUserType: (role) => {
    let userData = null;
    let workerData = null;
    let customerData = null;

    switch (role) {
      case 'user':
        userData = defaultUser;
        break;
      case 'worker':
        workerData = defaultWorker;
        break;
      case 'customer':
        customerData = defaultCustomer;
        break;
    }

    set({
      userType: role,
      user: userData,
      worker: workerData,
      customer: customerData,
    });
  },
  setUser: (user) => set({ user }),
  setWorker: (worker) => set({ worker }),
  setCustomer: (customer) => set({ customer }),
}));
