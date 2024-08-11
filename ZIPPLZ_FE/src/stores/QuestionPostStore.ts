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
  images?: string[];
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
    formData: FormData
  ) => Promise<{ code: number; message: string }>;
  updatePost: (
    token: string,
    id: number,
    postData: { title: string; board_content: string }
  ) => Promise<{ code: number; message: string }>;
  deletePost: (
    token: string,
    id: number
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
      console.log('Fetched question posts:', response.data.data);
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
        postData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
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
      }
      return { code, message: '수정 실패' };
    }
  },

  deletePost: async (token: string, id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/board/delete/${id}`,
        {
          headers: {
            Authorization: token,
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
        console.error('Failed to delete post:', error);
        console.error('Response data:', error.response?.data);
      }
      return { code: 500, message: '삭제 실패' };
    }
  },
}));
