import { create } from 'zustand';

type Type = 'nickname' | 'profileImg' | 'setting' | 'write' | 'chatRooms';

interface ModalState {
  nickname: boolean;
  profileImg: boolean;
  setting: boolean;
  write: boolean;
  chatRooms: boolean;
  actions: {
    changeModalState: (type: Type) => void;
  };
}

const useModalStore = create<ModalState>((set) => ({
  nickname: false,
  profileImg: false,
  setting: false,
  write: false,
  chatRooms: false,
  actions: {
    changeModalState: (type) => {
      set((state) => ({ ...state, [type]: !state[type] }));
    },
  },
}));

export default useModalStore;

export const useModalActions = () => useModalStore((state) => state.actions);

export const useNicknameModalState = () =>
  useModalStore((state) => state.nickname);
export const useProfileImgModalState = () =>
  useModalStore((state) => state.profileImg);

export const useSettingDrawerState = () =>
  useModalStore((state) => state.setting);
export const useWriteDrawerState = () => useModalStore((state) => state.write);
export const useChatRoomsModalState = () =>
  useModalStore((state) => state.chatRooms);
