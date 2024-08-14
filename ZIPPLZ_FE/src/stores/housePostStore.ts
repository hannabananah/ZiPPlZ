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

// 시공업자 정보 인터페이스
interface WorkerInfo {
  portfolio_serial: number;
  worker: number;
  user_name: string;
  birth_date: number;
  temperature: number;
  field_id: number;
  field_name: string;
  career: number;
  certificated_badge: number;
  locations: string[];
  img: string | null;
}

// 자랑글 상태 인터페이스
interface HousePostState {
  title: string;
  boardContent: string;
  images: File[];
  housePosts: HousePost[];
  postDetails: HousePostDetails | null;
  selectedWorkers: WorkerInfo[]; // 추가된 전역 상태
  setSelectedWorkers: (workers: WorkerInfo[]) => void; // 전역 상태 업데이트 함수
  setTitle: (title: string) => void;
  setBoardContent: (content: string) => void;
  setImages: (images: File[]) => void;
  fetchHousePosts: () => Promise<void>;
  fetchPostDetails: (id: number) => Promise<HousePostDetails | null>;
  createPost: (
    token: string,
    formData: FormData
  ) => Promise<{ code: number; message: string }>;
  updatePost: (
    token: string,
    id: number,
    postData: {
      title: string;
      board_content: string;
      selectedWorkers?: { portfolio_serial: number; worker: number }[];
    }
  ) => Promise<{ code: number; message: string }>;
  deletePost: (
    token: string,
    id: number
  ) => Promise<{ code: number; message: string }>;
  addComment: (
    token: string,
    comment: Comment
  ) => Promise<{ code: number; message: string }>;
  addReply: (
    token: string,
    reply: Comment
  ) => Promise<{ code: number; message: string }>;
  deleteComment: (
    token: string,
    commentSerial: number
  ) => Promise<{ code: number; message: string }>;
}

export const useHousePostStore = create<HousePostState>((set, get) => ({
  title: '',
  boardContent: '',
  images: [],
  housePosts: [],
  postDetails: null,
  selectedWorkers: [], // 초기값 설정
  setSelectedWorkers: (workers) => set({ selectedWorkers: workers }), // 상태 업데이트 함수

  setTitle: (title) => set({ title }),
  setBoardContent: (boardContent) => set({ boardContent }),
  setImages: (images) => set({ images }),

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

  fetchPostDetails: async (id: number) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/board/showoff/list/${id}`
      );

      if (response.data.proc.code === 200) {
        const data = response.data.data;

        const postDetails: HousePostDetails = {
          title: data.board.title,
          userSerial: data.board.userSerial,
          boardSerial: data.board.boardSerial,
          nickname: data.board.nickname,
          userName: data.board.userName,
          saveFile: data.board.saveFile,
          boardContent: data.board.boardContent,
          boardDate: data.board.boardDate,
          boardType: data.board.boardType,
          images: data.board_images.map((img: any) => ({
            saveFile: img.saveFile,
          })),
          tags: data.tags.map((tag: any) => ({
            worker: tag.worker,
            career: tag.career,
            portfolio_serial: tag.portfolio_serial,
            temperature: tag.temperature,
            certificated_badge: tag.certificated_badge,
            user_name: tag.user_name,
            field_name: tag.field_name,
            birth_date: tag.birth_date,
            field_id: tag.field_id,
          })),
          comments: data.comments.map((comment: any) => ({
            parent_comment: {
              userName: comment.parent_comment.userName,
              userSerial: comment.parent_comment.userSerial,
              commentSerial: comment.parent_comment.commentSerial,
              commentContent: comment.parent_comment.commentContent,
              commentDate: comment.parent_comment.commentDate,
              saveFile: comment.parent_comment.saveFile,
              nickName: comment.parent_comment.nickName,
            },
            child_comments: comment.child_comments.map((child: any) => ({
              userName: child.userName,
              userSerial: child.userSerial,
              commentSerial: child.commentSerial,
              commentContent: child.commentContent,
              commentDate: child.commentDate,
              saveFile: child.saveFile,
              nickName: child.nickName,
            })),
          })),
        };

        // Worker 정보가 postDetails.tags에 포함되어 있으므로 이를 selectedWorkers 상태로 설정
        set({
          postDetails,
          images: data.board_images.map((img: any) => img.saveFile),
          selectedWorkers: data.tags.map((tag: any) => ({
            portfolio_serial: tag.portfolio_serial,
            worker: tag.worker,
            user_name: tag.user_name,
            birth_date: tag.birth_date,
            temperature: tag.temperature,
            field_id: tag.field_id,
            field_name: tag.field_name,
            career: tag.career,
            certificated_badge: tag.certificated_badge,
            locations: [], // 필요에 따라 location 데이터를 추가
            img: null, // 필요에 따라 이미지 데이터를 추가
          })),
        });
        return postDetails;
      } else {
        console.error(
          'Failed to fetch post details:',
          response.data.proc.message
        );
        return null;
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
      return null;
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
    postData: {
      title: string;
      board_content: string;
      selectedWorkers?: { portfolio_serial: number; worker: number }[]; // optional 필드로 지정
    }
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
        return { code, message };
      } else {
        console.error(`Update failed: ${message}`);
        return { code, message };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to update post:', error);
        console.error('Response data:', error.response?.data);
      }
      return { code: 500, message: '수정 실패' };
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
        { ...comment },
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

  addReply: async (token: string, reply: Comment) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/comment/add',
        { ...reply },
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
        console.error('Failed to add reply:', error);
        console.error('Response data:', error.response?.data.proc);
      }
      return { code: 500, message: '대댓글 삽입 실패' };
    }
  },

  deleteComment: async (
    token: string,
    commentSerial: number
  ): Promise<{ code: number; message: string }> => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/comment/delete/${commentSerial}`,
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
        console.error('Failed to delete comment:', error);
        console.error('Response data:', error.response?.data);
      }
      return { code: 500, message: '댓글 삭제 실패' };
    }
  },
}));
