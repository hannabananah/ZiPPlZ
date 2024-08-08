import { useState } from 'react';

import type { ChatMessageData } from '@/types';
import { formatTime } from '@utils/formatDateWithTime';

interface MessageProps {
  message: ChatMessageData;
}

export default function Message({ message }: MessageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const currUserSerial = 2;
  const imageSrc = `data:image/png;base64,${message.chatMessageContent}`;

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setError(true);
    setLoading(false);
  };

  console.log('fileType', message.fileType);
  console.log('file', message.file);
  console.log('serial', message.file?.fileSerial);
  return (
    <li
      className={`flex items-start px-4 py-2 ${
        message.userSerial === currUserSerial ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.userSerial !== currUserSerial && (
        <img
          className="w-8 mr-2 border border-zp-light-gray profile-img"
          src="https://i.pravatar.cc/50?img=1"
          alt="프로필 이미지"
        />
      )}
      <div
        className={`px-3 py-2 rounded-zp-radius-bubble pb-2 text-zp-black max-w-[300px] min-w-[60px] drop-shadow-zp-normal bg-zp-white space-y-2 ${
          message.userSerial === currUserSerial
            ? 'text-right rounded-se-zp-radius-none'
            : 'text-left rounded-ss-zp-radius-none'
        }`}
      >
        {message.fileType === 'IMAGE' ? (
          <>
            {loading && <p>Loading image...</p>}
            {error && <p>Image failed to load.</p>}
            <img
              src={message.file?.saveFile}
              // src={imageSrc}
              alt={message.file?.fileName}
              className="max-w-[260px] max-h-[300px] object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: loading ? 'none' : 'block' }}
            />
          </>
        ) : (
          <p className="text-left whitespace-pre-wrap text-zp-xs">
            {message.chatMessageContent}
          </p>
        )}
        <p
          className={`text-zp-gray text-zp-3xs break-keep ${
            message.userSerial === currUserSerial ? 'text-left' : 'text-right'
          }`}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
      {message.userSerial === currUserSerial && (
        <img
          className="w-8 ml-2 border border-zp-light-gray profile-img"
          src="https://i.pravatar.cc/50?img=1"
          alt="프로필 이미지"
        />
      )}
    </li>
  );
}
