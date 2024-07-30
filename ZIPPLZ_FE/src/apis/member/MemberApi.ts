import axios from 'axios';

import { END_POINT } from '../apiConstants';
import { axiosInstance } from './../axiosInstance';

export interface User {
  email: string;
  password: string;
  userName: string;
  birthDate: string;
  tel: string;
}

export interface Customer {
  userSerial: number;
  nickname: string;
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
