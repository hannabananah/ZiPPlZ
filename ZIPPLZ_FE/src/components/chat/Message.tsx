import { useContext } from 'react';

import { formatTime } from '@utils/formatDateWithTime';
import { WebSocketContext } from '@utils/socket/WebSocketProvider';

export default function Message() {
  const context = useContext(WebSocketContext);
  console.log('context====>', context);

  if (!context) return <p>Loading...</p>;

  const { messages } = context;
  // 임시 설정
  const currUserSerial = 2;

  return (
    <ul>
      {messages.map((msg, index) => (
        <li
          key={index}
          className={`flex items-start p-2 ${
            msg.userSerial === currUserSerial ? 'justify-end' : 'justify-start'
          }`}
        >
          {msg.userSerial !== currUserSerial && (
            <img
              className="w-10 mr-3 border profile-img"
              src="https://i.pravatar.cc/50?img=1"
              alt="프로필 이미지"
            />
          )}
          <div
            className={`p-4 rounded-zp-radius-bubble pb-2 text-zp-black max-w-[300px] min-w-[60px] drop-shadow-zp-normal bg-zp-white space-y-2 ${
              msg.userSerial === currUserSerial
                ? 'text-right rounded-se-zp-radius-none'
                : 'text-left rounded-ss-zp-radius-none'
            }`}
          >
            <p className="text-left whitespace-pre-wrap text-zp-md">
              {msg.chatMessageContent}
            </p>
            <p
              className={`text-zp-gray text-zp-2xs break-keep ${
                msg.userSerial === currUserSerial ? 'text-left' : 'text-right'
              }`}
            >
              {formatTime(msg.createdAt)}
            </p>
          </div>
          {msg.userSerial === currUserSerial && (
            <img
              className="w-10 ml-3 border border-zp-light-gray profile-img"
              src="https://i.pravatar.cc/50?img=1"
              alt="프로필 이미지"
            />
          )}
        </li>
      ))}
    </ul>
  );
}
