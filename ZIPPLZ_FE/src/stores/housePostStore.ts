import axios from 'axios';
import { create } from 'zustand';

// 자랑글 인터페이스
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

// 댓글 인터페이스
interface Comment {
  board_serial: number;
  comment_content: string;
  parent_comment_serial: number;
  order_number: number;
}

// 자랑글 상태 인터페이스
interface HousePostState {
  title: string;
  boardContent: string;
  housePosts: HousePost[];
  setTitle: (title: string) => void;
  setBoardContent: (content: string) => void;
  fetchHousePosts: () => Promise<void>;
  createPost: (token: string) => Promise<{ code: number; message: string }>;
  addComment: (token: string, comment: Comment) => Promise<{ code: number; message: string }>;
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

  // 게시글 등록
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

  // 댓글 추가
  addComment: async (token: string, comment: Comment) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/comment/add',
        { body: comment },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const { code, message } = response.data.proc;
      return { code, message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to add comment:', error);
        console.error('Response data:', error.response?.data.proc);
      }
      return { code: 500, message: '댓글 삽입 실패' };
    }
  },
}));
