import axios from 'axios';
import { create } from 'zustand';

interface QuestionPost {
  board_serial: number;
  title: string;
  board_content: string;
  nickname: string;
  board_date: string;
  hit: number;
  wish_cnt: number;
  comment_cnt: number;
}

interface QuestionPostState {
  title: string;
  boardContent: string;
  questionPosts: QuestionPost[];
  setTitle: (title: string) => void;
  setBoardContent: (content: string) => void;
  fetchQuestionPosts: () => Promise<void>;
  createPost: (token: string) => Promise<{ code: number; message: string }>;
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
      console.log('Fetched question posts:', response.data.data); // 응답 데이터 구조 확인
      set({ questionPosts: response.data.data });
    } catch (error) {
      console.error('Failed to fetch question posts:', error);
    }
  },

  createPost: async (token: string) => {
    const { title, boardContent } = get();
    try {
      const response = await axios.post(
        'http://localhost:5000/board/question/add',
        {
          title: title,
          board_content: boardContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { code, message } = response.data.data.proc;
      if (code === 200) {
        // 새로운 글이 등록되었으면 목록을 다시 가져옵니다.
        await get().fetchQuestionPosts();
      }
      return { code, message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to create post:', error);
        console.error('Response data:', error.response?.data.data);
      }
      return { code: 500, message: '삽입 실패' };
    }
  },
}));
