// 상세 응답 메시지
export interface ChatMessageData {
  userSerial: number;
  userName: string;
  chatMessageContent: string;
  createdAt: string;
  fileType: 'IMAGE' | 'TALK' | 'FILE';
  file: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  } | null;
}

// 상세 응답 메시지
export interface File {
  fileSerial: number;
  saveFolder: string;
  originalFile: string;
  saveFile: string;
  fileName: string;
}

// 상세 응답 메시지

export interface Image {
  fileSerial: number;
  saveFolder: string;
  originalFile: string;
  saveFile: string;
  fileName: string;
}

// 채팅방 상대 정보
export interface OtherUser {
  name: string;
  location: string;
  fieldName: string;
  certificated: boolean;
  image: Image | null;
}

// 채팅방 목록 조회
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

// 채팅방 상세보기
export interface ChatRoomDetails {
  otherUser: OtherUser;
  chatMessages: ChatMessageData[];
}

// 메시지 전송
export interface SendMessageReq {
  type: 'IMAGE' | 'TALK' | 'FILE';
  chatroomSerial: number;
  userSerial: number;
  chatMessageContent: string;
  isFile: boolean;
  originalFileName: string;
}
