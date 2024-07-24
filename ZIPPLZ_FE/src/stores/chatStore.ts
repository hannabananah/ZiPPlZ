import { create } from 'zustand';

interface ChatRoom {
  id: number;
  name: string;
  message: string;
  temp: string;
  unread: number;
  imageUrl: string;
}

interface ChatStore {
  selectedChatRoom: ChatRoom | null;
  setSelectedChatRoom: (room: ChatRoom | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChatRoom: null,
  setSelectedChatRoom: (room) => set({ selectedChatRoom: room }),
}));
