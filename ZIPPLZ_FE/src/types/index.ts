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
  contract: boolean;
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
  file: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  } | null;
}

// 채팅방 상세보기
export interface ChatRoomDetails {
  otherUser: {
    name: string;
    location: string;
    fieldName: string;
    certificated: boolean;
    userSerial: number;
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
  originalFileName?: string;
  contract?: boolean;
}

// 자재 전체목록 조회
export interface Material {
  materialSerial: number;
  materialName: string;
  majorCategory: number;
  description: string;
  materialPrice: number;
  img: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  };
  wished: boolean;
}

// 계약서 초안 생성 응답
export interface ContractPostRes {
  requestSerial: number;
  requestDate: string;
  requestType: 'add';
  senderName: string;
  receiverName: string;
  requestStatus: 'pending';
  requestComment: '계약서 초안 작성해서 보냅니다.';
}

// A/S 요청
export interface AfterServiceRequestData {
  requestContent: string;
}

// 알림 조회
export interface NotificationData {
  notificationSerial: number;
  userSerial: {
    userSerial: number;
    fileSerial: {
      fileSerial: number;
      saveFolder: null;
      originalFile: string;
      saveFile: string;
      fileName: string;
    };
    email: string;
    password: string;
    userName: string;
    birthDate: string;
    tel: string;
    delYN: number;
    role: string;
  };
  notificationComment: string;
  notificationDate: string;
  isChecked: number;
}
[];

export interface Work {
  starDate: string;
  endDate: string;
  field: string;
}

export interface TodayWork {
  workSerial: number;
  startDate: string;
  endDate: string;
  field: string;
  address: string;
  workerProfile: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  };
  customerProfile: string;
  customer: {
    customerSerial: number;
    userSerial: {
      userSerial: number;
      fileSerial: number;
      email: string;
      password: string;
      userName: string;
      birthDate: string;
      tel: string;
      delYN: number;
      role: string;
    };
    nickname: string;
    currentAddress: string | null;
  };
  worker: {
    workerSerial: number;
    userSerial: {
      userSerial: number;
      fileSerial: {
        fileSerial: number;
        saveFolder: string;
        originalFile: string;
        saveFile: string;
        fileName: string | null;
      };
      email: string;
      password: string;
      userName: string;
      birthDate: string;
      tel: string;
      delYN: number;
      role: string;
    };
    company: string;
    companyAddress: string;
    businessNumber: string;
    hasAsBadge: number;
    certificatedBadge: number;
  };
}

export interface Plan {
  planSerial: number;
  planName: string;
  status: number;
}
