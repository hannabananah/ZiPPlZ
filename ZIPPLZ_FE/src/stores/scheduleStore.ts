import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  userSerial: number;
  fileSerial: number;
  email: string;
  password: string;
  userName: string;
  birthDate: string;
  tel: string;
  delYN: number;
  role: string;
}

interface Worker {
  workerSerial: number;
  userSerial: User;
  specialty: string;
  location: string;
  company: string;
  companyAddress: string;
  businessNumber: string;
  certificate: string | null;
  hasAsBadge: number;
}

interface Customer {
  customerSerial: number;
  userSerial: User;
  nickname: string;
  currentAddress: string;
}
interface Plan {
  planSerial: number;
  customerSerial: Customer;
  planName: string;
  address: string;
  sharedContents: string | null;
  isActive: number;
}
interface Field {
  fieldCode: number;
  fieldName: string;
}
interface Work {
  workSerial: number;
  workerSerial: Worker;
  planSerial: Plan;
  fieldCode: Field;
  startDate: string | null;
  endDate: string | null;
  isCompleted: number;
  workPrice: number;
  asScore: number;
  workContent: string | null;
}
interface File {
  fileSerial: number;
  saveFolder: string | null;
  originalFile: string;
  saveFile: string;
  fileName: string;
}

interface useScheduleStore {
  plan: Plan | null;
  work: Work | null;
  planList: Plan[] | null;
  workList: Work[] | null;
  fileList: File[] | null;
  selectedValue: string;
  setPlan: (plan: Plan | null) => void;
  setPlanList: (planList: Plan[] | null) => void;
  setWork: (work: Work | null) => void;
  setWorkList: (workList: Work[] | null) => void;
  setFileList: (fileList: File[] | null) => void;
  setSelectedValue: (selectedValue: string) => void;
}

export const useScheduleStore = create<useScheduleStore>(
  persist(
    (set) => ({
      plan: null,
      work: null,
      planList: [],
      workList: [],
      fileList: [],
      selectedValue: '계획을 선택해주세요.',
      setPlan: (plan) => set({ plan }),
      setWork: (work) => set({ work }),
      setPlanList: (planList) => set({ planList }),
      setWorkList: (workList) => set({ workList }),
      setFileList: (fileList) => set({ fileList }),
      setSelectedValue: (selectedValue) => set({ selectedValue }),
    }),
    {
      name: 'scheduler-info',
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({
      //   plan: state.plan,
      //   selecetdValue: state.selectedValue,
      //   fileList: state.fileList,
      // }),
    }
  )
);
