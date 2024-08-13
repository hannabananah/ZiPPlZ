import axios from 'axios';
import { create } from 'zustand';

// 질문글 형식 인터페이스
interface QuestionPost {
  board_serial: number;
  board_type: number;
  user_serial: number;
  title: string;
  nickname: string;
  board_date: string;
  hit: number;
  wish_cnt: number;
  comment_cnt: number;
  images: string[];
}

// 댓글 인터페이스
interface Comment {
  board_serial: number;
  comment_content: string;
  parent_comment_serial: number;
  order_number: number;
}

// 질문글 상세 정보 인터페이스
interface QuestionPostDetails {
  title: string;
  userSerial: number;
  boardSerial: number;
  nickname: string;
  boardContent: string;
  boardDate: string;
  images: { saveFile: string }[];
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

// 질문글 상태 관리 인터페이스
interface QuestionPostState {
  title: string;
  boardContent: string;
  images: File[];
  questionPosts: QuestionPost[];
  postDetails: QuestionPostDetails | null;
  setTitle: (title: string) => void;
  setBoardContent: (content: string) => void;
  setImages: (images: File[]) => void;
  fetchQuestionPosts: () => Promise<void>;
  fetchPostDetails: (id: number) => Promise<QuestionPostDetails | null>;
  createPost: (
    token: string,
    formData: FormData
  ) => Promise<{ code: number; message: string }>;
  updatePost: (
    token: string,
    id: number,
    formData: FormData
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

export const useQuestionPostStore = create<QuestionPostState>((set, get) => ({
  title: '',
  boardContent: '',
  images: [],
  questionPosts: [],
  postDetails: null,

  setTitle: (title) => set({ title }),
  setBoardContent: (boardContent) => set({ boardContent }),
  setImages: (images) => set({ images }),

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

  fetchPostDetails: async (id: number) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/board/question/list/${id}`
      );

      if (response.data.proc.code === 200) {
        const data = response.data.data;

        const postDetails: QuestionPostDetails = {
          title: data.board.title,
          userSerial: data.board.userSerial,
          boardSerial: data.board.boardSerial,
          nickname: data.board.nickname,
          boardContent: data.board.boardContent, // 여기서 제대로 된 필드명을 사용
          boardDate: data.board.boardDate,
          images: data.board_images.map((img: any) => ({
            saveFile: img.saveFile,
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

        set({ postDetails });
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
    formData: FormData // FormData를 받을 수 있도록 수정
  ) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/board/question/list/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data', // FormData 전송 시 올바른 Content-Type 설정
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
