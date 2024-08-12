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

// 자랑글 상세 정보 인터페이스
interface HousePostDetails {
  title: string;
  userSerial: number;
  boardSerial: number;
  nickname: string;
  userName: string;
  saveFile: string;
  boardContent: string;
  boardDate: string;
  boardType: number;
  images: { saveFile: string }[];
  tags: {
    worker: number;
    career: number;
    portfolio_serial: number;
    temperature: number;
    certificated_badge: number;
    user_name: string;
    field_name: string;
    birth_date: number;
    field_id: number;
  }[];
  comments: {
    parent_comment: {
      userName: string;
      userSerial: number;
      commentSerial: number;
      commentContent: string;
      commentDate: string;
      saveFile: string;
      nickName: string;
    };
    child_comments: {
      userName: string;
      userSerial: number;
      commentSerial: number;
      commentContent: string;
      commentDate: string;
      saveFile: string;
      nickName: string;
    }[];
  }[];
}

// 자랑글 상태 인터페이스
interface HousePostState {
  title: string;
  boardContent: string;
  images: File[]; // 이미지 파일 상태 추가
  housePosts: HousePost[];
  postDetails: HousePostDetails | null;
  setTitle: (title: string) => void;
  setBoardContent: (content: string) => void;
  setImages: (images: File[]) => void; // 이미지 파일 설정 함수 추가
  fetchHousePosts: () => Promise<void>;
  fetchPostDetails: (id: number) => Promise<void>;
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
  addComment: (
    token: string,
    comment: Comment
  ) => Promise<{ code: number; message: string }>;
}

export const useHousePostStore = create<HousePostState>((set, get) => ({
  title: '',
  boardContent: '',
  images: [], // 이미지 파일 상태 초기화
  housePosts: [],
  postDetails: null,

  setTitle: (title) => set({ title }),
  setBoardContent: (boardContent) => set({ boardContent }),
  setImages: (images) => set({ images }),

  fetchHousePosts: async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/board/showoff/list'
      );
      console.log('Fetched house posts:', response.data.data);
      set({ housePosts: response.data.data });
    } catch (error) {
      console.error('Failed to fetch house posts:', error);
    }
  },

  fetchPostDetails: async (id: number) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/board/showoff/list/${id}`
      );

      if (response.data.proc.code === 200) {
        set({ postDetails: response.data.data });
      } else {
        console.error(
          'Failed to fetch post details:',
          response.data.proc.message
        );
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  },

  createPost: async (token: string, formData: FormData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/board/showoff/add',
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
        await get().fetchHousePosts();
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
        `http://localhost:5000/board/showoff/list/${id}`,
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
        await get().fetchHousePosts();
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
        await get().fetchHousePosts();
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
