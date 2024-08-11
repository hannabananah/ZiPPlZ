import axios from 'axios';
import { create } from 'zustand';

// 질문글 형식
interface QuestionPost {
  board_serial: number;
  title: string;
  board_content: string;
  nickname: string;
  board_date: string;
  hit: number;
  wish_cnt: number;
  comment_cnt: number;
  images?: string[]; // 이미지 URL 배열 필드 추가
}

// 질문글 상태 관리
interface QuestionPostState {
  title: string;
  boardContent: string;
  questionPosts: QuestionPost[];
  setTitle: (title: string) => void;
  setBoardContent: (content: string) => void;
  fetchQuestionPosts: () => Promise<void>;
  createPost: (
    token: string,
    formData: FormData // 이미지와 다른 데이터를 포함하는 FormData 사용
  ) => Promise<{ code: number; message: string }>;
}

export const useQuestionPostStore = create<QuestionPostState>((set, get) => ({
  title: '',
  boardContent: '',
  questionPosts: [],

  setTitle: (title) => set({ title }),
  setBoardContent: (boardContent) => set({ boardContent }),

  fetchQuestionPosts: async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/board/question/list'
      );
      console.log('Fetched question posts:', response.data.data); // 서버 응답 확인
      set({ questionPosts: response.data.data });
    } catch (error) {
      console.error('Failed to fetch question posts:', error);
    }
  },

  createPost: async (token: string, formData: FormData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/board/question/add',
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { code, message } = response.data.proc;
      if (code === 200) {
        await get().fetchQuestionPosts();
      }
      return { code, message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to create post:', error);
        console.error('Response data:', error.response?.data);
      }
      return { code: 500, message: '삽입 실패' };
    }
  },

  updatePost: async (
    token: string,
    id: number,
    postData: { title: string; board_content: string }
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/board/question/list/${id}`,
        postData, // JSON 형식으로 데이터를 전송합니다.
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json', // JSON 형식의 Content-Type을 명시합니다.
          },
        }
      );

      const { code, message } = response.data.proc;
      if (code === 200) {
        await get().fetchQuestionPosts();
      }
      return { code, message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to update post:', error);
        console.error('Response data:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      return { code: 500, message: '수정 실패' };
    }
  },
}));
