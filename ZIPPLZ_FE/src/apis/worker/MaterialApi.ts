import { END_POINT } from '@apis/apiConstants';
import { axiosInstance } from '@apis/axiosInstance';

export interface Material {
  materialSerial: number;
  materialName: string;
  description: string;
  materialPrice: number;
  majorCategory: number;
  img: string;
}

export const getMaterials = async () => {
  return await axiosInstance.get(END_POINT.MATERIAL);
};
