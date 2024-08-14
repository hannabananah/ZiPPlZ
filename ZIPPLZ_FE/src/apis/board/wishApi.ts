import { END_POINT } from '../apiConstants';
import { axiosInstance } from '../axiosInstance';

//찜하기
export const addWish = async () => {
  return await axiosInstance.post(
    END_POINT.WISH + '/addwish',
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
};
