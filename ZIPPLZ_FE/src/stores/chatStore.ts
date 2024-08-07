import { create } from 'zustand';

interface ChatRoom {
  chatroom_serial: number;
  message: string;
  field_name: string;
  worker_name: string;
  customer_name: string;
  temperature: number;
  time: string;
  unread: number;
  certificated: boolean;
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
