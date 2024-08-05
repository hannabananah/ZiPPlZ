import { useContext } from 'react';

import { formatTime } from '@utils/formatDateWithTime';
import { WebSocketContext } from '@utils/socket/WebSocketProvider';

interface ChatMessage {
  userSerial: number;
  userName: string;
  chatMessageContent: string;
  createdAt: string;
  isFile: boolean;
}

interface MessageProps {
  message: ChatMessage;
}

export default function Message({ message }: MessageProps) {
  const context = useContext(WebSocketContext);
  console.log('context====>', context);

  const currUserSerial = 2;

  return (
    <li
      className={`flex items-start p-2 ${
        message.userSerial === currUserSerial ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.userSerial !== currUserSerial && (
        <img
          className="w-10 mr-3 profile-img"
          src="https://i.pravatar.cc/50?img=1"
          alt="프로필 이미지"
        />
      )}
      <div
        className={`p-4 rounded-zp-radius-bubble pb-2 text-zp-black max-w-[300px] min-w-[60px] drop-shadow-zp-normal bg-zp-white space-y-2 ${
          message.userSerial === currUserSerial
            ? 'text-right rounded-se-zp-radius-none'
            : 'text-left rounded-ss-zp-radius-none'
        }`}
      >
        <p className="text-left whitespace-pre-wrap text-zp-md">
          {message.chatMessageContent}
        </p>
        <p
          className={`text-zp-gray text-zp-2xs break-keep ${
            message.userSerial === currUserSerial ? 'text-left' : 'text-right'
          }`}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
      {message.userSerial === currUserSerial && (
        <img
          className="w-10 ml-3 border border-zp-light-gray profile-img"
          src="https://i.pravatar.cc/50?img=1"
          alt="프로필 이미지"
        />
      )}
    </li>
  );
}
