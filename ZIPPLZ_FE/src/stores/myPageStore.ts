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
  uploadProfileImage: (file: File | string) => Promise<void>;
  deleteProfileImage: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>; // 비밀번호 변경 함수 추가
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
          phoneNumber: data.tel,
          address: data.currentAddress,
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
        set({ name: nickname, phoneNumber: tel, address: currentAddress });
      } else {
        console.error('고객 정보 업데이트 실패:', response.data.proc.message);
      }
    } catch (error) {
      console.error('고객 정보 업데이트 중 오류 발생:', error);
    }
  },

  uploadProfileImage: async (file: File | string) => {
    let formData;

    if (typeof file === 'string') {
      formData = new FormData();
      formData.append('icon', file);
    } else {
      formData = new FormData();
      formData.append('image', file);
    }

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
        set({ profileImg: null });
      } else {
        console.error('프로필 이미지 삭제 실패:', response.data.proc.message);
      }
    } catch (error) {
      console.error('프로필 이미지 삭제 중 오류 발생:', error);
    }
  },

  changePassword: async (newPassword: string) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5000/mypage/change-pw',
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        console.log('비밀번호가 성공적으로 변경되었습니다.');
      } else {
        console.error('비밀번호 변경 실패:', response.data.proc.message);
      }
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
    }
  },
}));
