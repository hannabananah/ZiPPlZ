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
  images?: string[]; // images 필드 추가
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
    images: File[]
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
      set({ questionPosts: response.data.data });
    } catch (error) {
      console.error('Failed to fetch question posts:', error);
    }
  },

  createPost: async (token: string, images: File[]) => {
    const { title, boardContent } = get();
    try {
      const formData = new FormData();

      // 이미지 파일이 있을 경우에만 추가
      if (images.length > 0) {
        images.forEach((image) => {
          formData.append('images', image);
        });
      }

      // params 객체를 JSON 문자열로 변환하여 추가
      const params = {
        title: title,
        board_content: boardContent,
      };

      formData.append(
        'params',
        new Blob([JSON.stringify(params)], { type: 'application/json' })
      );

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
}));
