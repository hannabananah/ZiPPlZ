import { useState } from 'react';

import type { ChatMessageData } from '@/types';
import { useLoginUserStore } from '@stores/loginUserStore';
import { formatTime } from '@utils/formatDateWithTime';

interface MessageProps {
  message: ChatMessageData;
}

export default function Message({ message }: MessageProps) {
  const [loading, setLoading] = useState(true);

  // 파일 URL 생성
  // const imageSrc = `data:image/png;base64,${message.chatMessageContent}`;
  // console.log('message.chatMessageContent', message.chatMessageContent);
  const fileUrl = message.file?.saveFile;
  console.log('saveFile', message.file?.saveFile);
  const fileName = message.file?.fileName;
  const fileType = message.fileType;
  const isImage = fileType === 'IMAGE';
  const isFile = fileType === 'FILE';

  const { loginUser } = useLoginUserStore();
  const currUserSerial: number | undefined = loginUser?.userSerial;

  // 이미지 로드 핸들러
  const handleImageLoad = () => {
    setLoading(false);
  };

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
        {isImage ? (
          <>
            {loading && <p>Loading image...</p>}
            {/*   <img
              src={fileUrl}
              // src={imageSrc}
              alt={fileName}
              className="max-w-[260px] max-h-[300px] object-cover"
              onLoad={handleImageLoad}
              style={{ display: loading ? 'none' : 'block' }}
            /> */}

            {fileUrl && (
              <img
                src={fileUrl}
                alt="Message Image"
                className="max-w-[260px] max-h-[300px] object-cover"
              />
            )}
          </>
        ) : isFile ? (
          <a
            href={fileUrl}
            // href={imageSrc}
            download={fileName}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {fileName || 'Download file'}
          </a>
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
