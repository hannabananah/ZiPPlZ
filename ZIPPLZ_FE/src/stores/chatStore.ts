import type { ChatRoomDetails } from '@/types';
import { create } from 'zustand';

interface ChatStoreState {
  selectedChatRoom: ChatRoomDetails | null;
  setSelectedChatRoom: (room: ChatRoomDetails) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  selectedChatRoom: null,
  setSelectedChatRoom: (room: ChatRoomDetails) =>
    set({ selectedChatRoom: room }),
}));
