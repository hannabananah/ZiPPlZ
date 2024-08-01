// 포트폴리오 정보 API
import { END_POINT } from '@apis/apiConstants';
import { axiosInstance } from '@apis/axiosInstance';

export interface User {
  email: string;
  password: string;
  userName: string;
  birthDate: string;
  tel: string;
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

export const getSido = async () => {
  return await axiosInstance.get(END_POINT.SIDO);
};

export const getGugun = async (sidocode: number) => {
  return await axiosInstance.get(END_POINT.GUGUN(sidocode));
};

export const getFields = async () => {
  return await axiosInstance.get(END_POINT.DEFAULT + '/field');
};
