import { END_POINT } from '../apiConstants';
import { axiosInstance } from '../axiosInstance';

// [ wish_type 종류 ]
// 질문글 : 1
// 자랑글 : 2
// 구인구직글 : 3
// 자재 : 4
// 포트폴리오 : 5
//찜하기
export const addWish = async (boardSerial: number, type: number) => {
  return await axiosInstance.post(
    END_POINT.WISH + '/addWish',
    { wish_serial: boardSerial, wish_type: type },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};

//관심목록 조회
export const getWish = async (boardSerial: number) => {
  return await axiosInstance.post(
    END_POINT.WISH + '/searchWish',
    { wish_serial: boardSerial },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};
//관심목록 삭제
export const cancelWish = async (boardSerial: number, type: number) => {
  return await axiosInstance.delete(END_POINT.WISH + '/deleteWish', {
    data: {
      wish_serial: boardSerial,
      wish_type: type,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};
