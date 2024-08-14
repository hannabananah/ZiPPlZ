import { END_POINT } from '@apis/apiConstants';
import { axiosInstance } from '@apis/axiosInstance';

export interface ContractRequestData {
  requestComment: string;
  startDate: string;
  endDate: string;
  workPrice: number;
  materialList: number[];
}

export const postContract = async (
  chatroomSerial: number,
  requestData: ContractRequestData
) => {
  if (!chatroomSerial) {
    throw new Error('chatroomSerial이 필요합니다.');
  }
  if (!requestData) {
    throw new Error('requestData가 필요합니다.');
  }

  try {
    const response = await axiosInstance.post(
      END_POINT.CONTRACT + `/draft/${chatroomSerial}`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('계약서 작성 중 에러가 발생했습니다:', error);
    throw new Error('계약서 초안 작성에 실패했습니다.');
  }
};
