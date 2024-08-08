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

// 파일(type이 IMAGE 혹은 FILE 일 경우) 관련 데이터
export interface File {
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
  image: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  } | null;
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
  otherUser: {
    name: string;
    location: string;
    fieldName: string;
    certificated: boolean;
    image: {
      fileSerial: number;
      saveFolder: string;
      originalFile: string;
      saveFile: string;
      fileName: string;
    } | null;
  };
  chatMessages: {
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
  }[];
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
