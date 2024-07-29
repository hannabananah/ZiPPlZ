import axios from 'axios';

import { END_POINT } from '../apiConstants';
import { axiosInstance } from './../axiosInstance';

interface user {
  email: string;
  password: string;
  userName: string;
  birthDate: string;
  tel: string;
}

export const signUp = async (data: user) => {
  return await axiosInstance.post(END_POINT.SIGNUP, data);
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
