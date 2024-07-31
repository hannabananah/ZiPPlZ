// 포트폴리오 정보 API
import { END_POINT } from '@apis/apiConstants';
import { axiosInstance } from '@apis/axiosInstance';

// export interface User {
//   email: string;
//   password: string;
//   userName: string;
//   birthDate: string;
//   tel: string;
// }

export interface workerInfo {
  // 이름
  // 생년월일
  // 뱃지
  // 온도
  // 지역
  // 전기
  // 경력 3년
}

interface Location {
  sidoCode: number;
  gugunCode: number;
  localName: string;
}

interface Field {
  fieldCode: number;
  fieldName: string;
}

export interface Worker {
  userSerial: number;
  locationList: Location[];
  fieldList: Field[];
  businessNumber: string;
  company: string;
  companyAddress: string;
}

export const signUp = async (data: User) => {
  return await axiosInstance.post(END_POINT.SIGNUP, data);
};

export const signUpCustomer = async (data: Customer) => {
  return await axiosInstance.post(END_POINT.SIGNUP + '/customer', data);
};

export const signUpWorker = async (data: Worker) => {
  return await axiosInstance.post(END_POINT.SIGNUP + '/worker', data);
};

export const getSido = async () => {
  return await axiosInstance.get(END_POINT.SIDO);
};

export const getGugun = async (sidocode: number) => {
  return await axiosInstance.get(END_POINT.GUGUN(sidocode));
};

export const getFields = async () => {
  return await axiosInstance.get(END_POINT.DEFAULT + '/field');
};
