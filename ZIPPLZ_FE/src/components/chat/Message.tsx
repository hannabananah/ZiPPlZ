import { useLoginUserStore } from '@stores/loginUserStore';
import { formatTime } from '@utils/formatDateWithTime';

interface MessageProps {
  userSerial: number;
  chatMessageContent?: string;
  createdAt: string;
  fileType?: string;
}

export default function Message({
  userSerial,
  chatMessageContent,
  createdAt,
  fileType,
}: MessageProps) {
  let formattedImgUrl = '';
  if (fileType === 'IMAGE') {
    formattedImgUrl = `data:image/jpeg;base64,${chatMessageContent}`;
  } else if (fileType === 'FILE' && chatMessageContent) {
    formattedImgUrl = `data:text/plain;base64,${chatMessageContent}`;
  }

  const isImage = fileType === 'IMAGE';
  const isFile = fileType === 'FILE';
  const { loginUser } = useLoginUserStore();
  const currUserSerial = loginUser?.userSerial;

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
            {formattedImgUrl && (
              <img
                src={formattedImgUrl}
                alt="Message Image"
                className="max-w-[260px] max-h-[300px] object-cover"
              />
            )}
          </>
        ) : isFile ? (
          <a
            href={formattedImgUrl}
            download={formattedImgUrl}
            className={`hover:text-zp-black text-zp-gray underline ${fileType === 'FILE' ? 'line-clamp-2' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {formattedImgUrl}
          </a>
        ) : (
          <p className="text-left whitespace-pre-wrap text-zp-gray text-zp-xs">
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
