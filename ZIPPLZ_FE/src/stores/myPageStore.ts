import axios from 'axios';
import { create } from 'zustand';

interface WorkerPost {
  board_serial: number;
  board_type: number;
  user_serial: number;
  title: string;
  board_content: string;
  board_date: string;
  hit: number;
  nickname: string;
  comment_cnt: number;
  wish_cnt: number;
}

interface QuestionPost {
  board_serial: number;
  board_type: number;
  user_serial: number;
  title: string;
  board_content: string;
  board_date: string;
  hit: number;
  nickname: string;
  comment_cnt: number;
  wish_cnt: number;
}

interface HousePost {
  board_serial: number;
  board_type: number;
  user_serial: number;
  title: string;
  board_content: string;
  board_date: string;
  hit: number;
  nickname: string;
  comment_cnt: number;
  wish_cnt: number;
}

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
  uploadProfileImage: (file: File | Blob) => Promise<void>;
  deleteProfileImage: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  fetchMyHousePostList: () => Promise<HousePost[]>;
  fetchMyQuestionPostList: () => Promise<QuestionPost[]>;
  fetchMyHousePostScrapList: () => Promise<HousePost[]>;
  fetchMyQuestionPostScrapList: () => Promise<QuestionPost[]>;
  fetchMyFindWorkerList: () => Promise<WorkerPost[]>; // 내가 쓴 구인구직글 목록 가져오기 함수 추가
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

  uploadProfileImage: async (file: File | Blob) => {
    let formData = new FormData();

    if (file instanceof Blob) {
      formData.append('image', file);
    } else {
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

  fetchMyHousePostList: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        'http://localhost:5000/mypage/showboards',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        return response.data.data;
      } else {
        console.error(
          '내가 쓴 자랑글 목록을 가져오는데 실패했습니다:',
          response.data.proc.message
        );
        return [];
      }
    } catch (error) {
      console.error(
        '내가 쓴 자랑글 목록을 가져오는 중 오류가 발생했습니다:',
        error
      );
      return [];
    }
  },

  fetchMyQuestionPostList: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        'http://localhost:5000/mypage/questions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        return response.data.data;
      } else {
        console.error(
          '내가 쓴 질문글 목록을 가져오는데 실패했습니다:',
          response.data.proc.message
        );
        return [];
      }
    } catch (error) {
      console.error(
        '내가 쓴 질문글 목록을 가져오는 중 오류가 발생했습니다:',
        error
      );
      return [];
    }
  },

  fetchMyHousePostScrapList: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        'http://localhost:5000/mypage/wish/showboards',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        return response.data.data;
      } else {
        console.error(
          '찜한 자랑글 목록을 가져오는데 실패했습니다:',
          response.data.proc.message
        );
        return [];
      }
    } catch (error) {
      console.error(
        '찜한 자랑글 목록을 가져오는 중 오류가 발생했습니다:',
        error
      );
      return [];
    }
  },

  fetchMyQuestionPostScrapList: async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        'http://localhost:5000/mypage/wish/questions',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        return response.data.data;
      } else {
        console.error(
          '찜한 질문글 목록을 가져오는데 실패했습니다:',
          response.data.proc.message
        );
        return [];
      }
    } catch (error) {
      console.error(
        '찜한 질문글 목록을 가져오는 중 오류가 발생했습니다:',
        error
      );
      return [];
    }
  },

  fetchMyFindWorkerList: async () => {
    // 구인구직글 목록을 가져오는 함수 추가
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        'http://localhost:5000/mypage/findworkers',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.proc.code === 200) {
        return response.data.data;
      } else {
        console.error(
          '내가 쓴 구인구직글 목록을 가져오는데 실패했습니다:',
          response.data.proc.message
        );
        return [];
      }
    } catch (error) {
      console.error(
        '내가 쓴 구인구직글 목록을 가져오는 중 오류가 발생했습니다:',
        error
      );
      return [];
    }
  },
}));
