import { create } from 'zustand';

interface User {
  user_serial: number;
  email: string;
  password: string;
  user_name: string;
  tel: string;
  birth_date: Date;
  del_yn: number;
}

interface Worker extends User {
  worker_serial: number;
  specialty: string;
  location: string;
  company: string;
  company_address: string;
  business_number: string;
  certificate: string;
  has_as_badge: number;
}

interface Customer extends User {
  customer_serial: number;
  nickname: string;
  current_address: string;
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
  user_serial: 1,
  email: 'user@example.com',
  password: 'password123',
  user_name: '김철수',
  tel: '010-1234-5678',
  birth_date: new Date('1990-01-01'),
  del_yn: 0,
};

const defaultWorker: Worker = {
  ...defaultUser,
  worker_serial: 201,
  specialty: '소프트웨어 엔지니어',
  location: '서울',
  company: '테크코리아',
  company_address: '서울특별시 강남구 테헤란로 123',
  business_number: '123-45-67890',
  certificate: '전문가 인증서',
  has_as_badge: 1,
};

const defaultCustomer: Customer = {
  ...defaultUser,
  customer_serial: 301,
  nickname: '홍길동',
  current_address: '부산광역시 해운대구 우동 456',
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
