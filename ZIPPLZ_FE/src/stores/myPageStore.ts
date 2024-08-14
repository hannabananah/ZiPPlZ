import axios from 'axios';
import { create } from 'zustand';

interface MyPageState {
  profileImg: string | null;
  name: string;
  role: string;
  phoneNumber: string;
  address: string;
  fetchMyPageData: () => Promise<void>;
  updateCustomerInfo: (
    tel: string,
    nickname: string,
    currentAddress: string
  ) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  deleteProfileImage: () => Promise<void>;
}

export const useMyPageStore = create<MyPageState>((set) => ({
  profileImg: null,
  name: '',
  role: '',
  phoneNumber: '',
  address: '',
  fetchMyPageData: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/mypage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.proc.code === 200) {
        const data = response.data.data;
        set({
          profileImg: data.profileImg?.saveFile || null,
          name: data.name,
          role: data.role,
          phoneNumber: data.tel, // 전화번호 가져오기
          address: data.currentAddress, // 주소 가져오기
        });
      } else {
        console.error(
          'Failed to fetch MyPage data:',
          response.data.proc.message
        );
      }
    } catch (error) {
      console.error('Error fetching MyPage data:', error);
    }
  },

  updateCustomerInfo: async (
    tel: string,
    nickname: string,
    currentAddress: string
  ) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/mypage/update-customer',
        {
          tel,
          nickname,
          currentAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        console.log('고객 정보가 성공적으로 업데이트되었습니다.');
        // 업데이트된 정보를 상태에 반영합니다.
        set({ name: nickname, phoneNumber: tel, address: currentAddress });
      } else {
        console.error('고객 정보 업데이트 실패:', response.data.proc.message);
      }
    } catch (error) {
      console.error('고객 정보 업데이트 중 오류 발생:', error);
    }
  },

  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5000/mypage/profile-img',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.proc.code === 200) {
        console.log('프로필 이미지가 성공적으로 업로드되었습니다.');
        // 서버에 저장된 이미지 URL을 상태로 업데이트
        const newProfileImgUrl = response.data.data?.profileImg?.saveFile || '';
        set({ profileImg: newProfileImgUrl });
      } else {
        console.error('프로필 이미지 업로드 실패:', response.data.proc.message);
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 중 오류 발생:', error);
    }
  },

  deleteProfileImage: async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(
        'http://localhost:5000/mypage/profile-img',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        console.log('프로필 이미지가 성공적으로 삭제되었습니다.');
        set({ profileImg: null }); // 프로필 이미지를 초기화
      } else {
        console.error('프로필 이미지 삭제 실패:', response.data.proc.message);
      }
    } catch (error) {
      console.error('프로필 이미지 삭제 중 오류 발생:', error);
    }
  },
}));
