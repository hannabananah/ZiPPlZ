import { END_POINT } from '@apis/apiConstants';
import { axiosInstance } from '@apis/axiosInstance';

// User 객체 선언
export interface User {
  userName: string;
  birthDate: string;
}

// Worker 객체 선언
export interface Worker {
  userSerial: number;
}

// Porfolio 객체 선언
export interface Portfolio {
  portfolioSerial: number;
  career: number;
  fieldId: number;
  temp: number;
  locationList: Location[];
  fieldList: Field[];
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

export const signUp = async (data: User) => {
  return await axiosInstance.post(END_POINT.SIGNUP, data);
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
