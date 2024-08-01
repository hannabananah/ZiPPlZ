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

// Porfolio 객체 선언 및 확장: User와 Worker 변수 받아오기
export interface Portfolio extends User, Worker {
  portfolioSerial: number;
  career: number;
  fieldId: number;
  temp: number;
  locationList: Location[];
  fieldList: Field[];
}

// 지역(시도, 구군, 지역이름) 객체
interface Location {
  sidoCode: number;
  gugunCode: number;
  localName: string;
}

// 시공 분야(코드, 이름) 객체
interface Field {
  fieldCode: number;
  fieldName: string;
}

// axios로 포트폴리오 정보 받아오는 함수
export const getPortfolio = async () => {
  return await axiosInstance.get(END_POINT.PORTFOLIO);
};

// axios로 시도 정보 받아오는 함수
// export const getSido = async () => {
//   return await axiosInstance.get(END_POINT.SIDO);
// };

// axios로 구군 정보 받아보는 함수
// export const getGugun = async (sidocode: number) => {
//   return await axiosInstance.get(END_POINT.GUGUN(sidocode));
// };

// axios로 공종 정보 받아오는 함수
// export const getFields = async () => {
//   return await axiosInstance.get(END_POINT.DEFAULT + '/field');
// };
