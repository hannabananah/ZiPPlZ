import axios from 'axios';
import { create } from 'zustand';

interface HousePost {
  board_serial: number;
  board_type: number;
  user_serial: number;
  img: string;
  title: string;
  nickname: string;
  board_date: string;
  hit: number;
  wish_cnt: number;
  comment_cnt: number;
}

interface HousePostState {
  title: string;
  boardContent: string;
  housePosts: HousePost[];
  setTitle: (title: string) => void;
  setBoardContent: (content: string) => void;
  fetchHousePosts: () => Promise<void>;
  createPost: (token: string) => Promise<{ code: number; message: string }>;
}

export const useHousePostStore = create<HousePostState>((set, get) => ({
  title: '',
  boardContent: '',
  housePosts: [],

  setTitle: (title) => set({ title }),
  setBoardContent: (boardContent) => set({ boardContent }),

  fetchHousePosts: async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/board/showoff/list'
      );
      set({ housePosts: response.data.data });
    } catch (error) {
      console.error('Failed to fetch house posts:', error);
    }
  },

  createPost: async (token: string) => {
    const { title, boardContent } = get();
    try {
      const response = await axios.post(
        'http://localhost:5000/board/showoff/add',
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
