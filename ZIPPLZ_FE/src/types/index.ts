export interface ChatMessageData {
  userSerial: number;
  userName: string;
  chatMessageContent: string;
  createdAt: string;
  isFile: boolean;
}

export interface File {
  fileSerial: number;
  saveFolder: string;
  originalFile: string;
  saveFile: string;
  fileName: string;
}

export interface Image {
  fileSerial: number;
  saveFolder: string;
  originalFile: string;
  saveFile: string;
  fileName: string;
}

export interface OtherUser {
  name: string;
  location: string;
  fieldName: string;
  certificated: boolean;
  image: Image | null;
}

export interface ChatRoom {
  chatroomSerial: string;
  lastMessage: string;
  fieldName: string;
  workerName: string;
  customerName: string;
  temperature: number;
  createdAt: string;
  unreadCount: number;
  certificated: boolean;
  file: File | null;
}

export interface ChatRoomDetails {
  otherUser: OtherUser;
  chatMessages: ChatMessageData[];
}
