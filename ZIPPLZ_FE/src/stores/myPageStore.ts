import axios from 'axios';
import { create } from 'zustand';

interface MyPageState {
  profileImg: string | null;
  name: string;
  role: string;
  fetchMyPageData: () => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  deleteProfileImage: () => Promise<void>;
}

export const useMyPageStore = create<MyPageState>((set) => ({
  profileImg: null,
  name: '',
  role: '',
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
          profileImg: data.profileImg.saveFile,
          name: data.name,
          role: data.role,
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
