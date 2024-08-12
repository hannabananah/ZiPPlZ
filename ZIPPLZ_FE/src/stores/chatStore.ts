import { create } from 'zustand';

interface ChatRoom {
  chatroom_serial: number;
  user_serial: number;
  session_id: string;
  chatroom_name: string;
  name: string;
  imageUrl: string;
  temp: string;
}

interface ChatStore {
  selectedChatRoom: ChatRoom | null;
  setSelectedChatRoom: (room: ChatRoom | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChatRoom: null,
  setSelectedChatRoom: (room) => set({ selectedChatRoom: room }),
}));
