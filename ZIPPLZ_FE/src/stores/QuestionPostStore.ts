import axios from 'axios';
import { create } from 'zustand';

interface QuestionPost {
  board_serial: number;
  title: string;
  board_content: string;
  nickname: string;
  board_date: string;
  hit: number;
  comment_cnt: number;
  wish_cnt: number;
}

interface QuestionPostStoreState {
  questionPosts: QuestionPost[];
  fetchQuestionPosts: () => void;
}

export const useQuestionPostStore = create<QuestionPostStoreState>((set) => ({
  questionPosts: [],
  fetchQuestionPosts: async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/board/question/list'
      );
      const data = response.data.data;
      set({ questionPosts: data });
    } catch (error) {
      console.error('Failed to fetch question posts:', error);
    }
  },
}));
