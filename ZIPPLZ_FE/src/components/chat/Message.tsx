import { useEffect, useState } from 'react';

import type { ChatMessageData } from '@/types';
import { useLoginUserStore } from '@stores/loginUserStore';
import { formatTime } from '@utils/formatDateWithTime';

interface MessageProps {
  userSerial: number;
  chatMessageContent?: string; // Optional if data may not always be present
  createdAt: string;
  fileName?: string; // Optional
  originalFile?: string; // Optional
  fileType?: string; // Optional
  saveFile?: string; // Optional
}

export default function Message({
  userSerial,
  chatMessageContent,
  createdAt,
  fileName,
  fileType,
  saveFile,
}: MessageProps) {
  const formattedImgUrl = `data:image/jpeg;base64,${chatMessageContent}`;
  const isImage = fileType === 'IMAGE';
  const isFile = fileType === 'FILE' || fileType === 'IMAGE';
  const { loginUser } = useLoginUserStore();
  const currUserSerial = loginUser?.userSerial;
  console.log('saveFile', saveFile);

  return (
    <li
      className={`flex items-start px-4 py-2 ${
        userSerial === currUserSerial ? 'justify-end' : 'justify-start'
      }`}
    >
      {userSerial !== currUserSerial && (
        <img
          className="w-8 mr-2 border border-zp-light-gray profile-img"
          src="https://i.pravatar.cc/50?img=1"
          alt="프로필 이미지"
        />
      )}
      <div
        className={`p-2 rounded-zp-radius-bubble pb-2 text-zp-black max-w-[300px] min-w-[60px] drop-shadow-zp-normal bg-zp-white space-y-2 ${
          userSerial === currUserSerial
            ? 'text-right rounded-se-zp-radius-none'
            : 'text-left rounded-ss-zp-radius-none'
        }`}
      >
        {isImage ? (
          <>
            {/* {loading && <p>Loading image...</p>} */}
            {formattedImgUrl && (
              <img
                src={formattedImgUrl}
                alt="Message Image"
                className="max-w-[260px] max-h-[300px] object-cover"
                // onLoad={handleImageLoad}
                // style={{ display: loading ? 'none' : 'block' }}
              />
            )}
          </>
        ) : isFile ? (
          <a
            href={saveFile}
            download={fileName}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {fileName || 'Download file'}
          </a>
        ) : (
          <p className="text-left whitespace-pre-wrap text-zp-xs">
            {chatMessageContent}
          </p>
        )}
        <p
          className={`text-zp-gray text-zp-3xs break-keep ${
            userSerial === currUserSerial ? 'text-left' : 'text-right'
          }`}
        >
          {formatTime(createdAt)}
        </p>
      </div>
      {userSerial === currUserSerial && (
        <img
          className="w-8 ml-2 border border-zp-light-gray profile-img"
          src="https://i.pravatar.cc/50?img=1"
          alt="프로필 이미지"
        />
      )}
    </li>
  );
}
