import Button from '@components/common/Button';
import { useLoginUserStore } from '@stores/loginUserStore';
import { formatTime } from '@utils/formatDateWithTime';
import axios from 'axios';

interface MessageProps {
  userSerial: number;
  chatMessageContent?: string;
  createdAt: string;
  fileType?: string;
  contract?: boolean;
}

const base_url = import.meta.env.VITE_APP_BASE_URL;

export default function Message({
  userSerial,
  chatMessageContent,
  createdAt,
  fileType,
  contract,
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
  const currRole = loginUser?.role;

  const postRejectContract = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const url = `${base_url}/contract/reject`;

      const response = await axios.post(url, null, { headers });
      if (response.status === 200) {
        console.log('성공적으로 계약을 거절했습니다.');
      } else {
        console.error('계약거절 중 에러발생', response);
      }
    } catch (error) {
      console.error('계약거절 중 에러발생', error);
    }
  };

  const acceptContract = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const url = `${base_url}/contract/accept`;

      const response = await axios.post(url, null, { headers });
      if (response.status === 200) {
        console.log('성공적으로 계약을 수락했습니다.');
      } else {
        console.error('계약수락 중 에러발생', response);
      }
    } catch (error) {
      console.error('계약수락 중 에러발생', error);
    }
  };
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
        {contract && currRole == 'customer' && (
          <div className="flex justify-end gap-2 mt-2">
            <Button
              type="button"
              buttonType="normal"
              width="full"
              height={1.5}
              fontSize="2xs"
              radius="btn"
              onClick={postRejectContract}
            >
              거절
            </Button>
            <Button
              type="button"
              buttonType="second"
              width="full"
              height={1.5}
              fontSize="2xs"
              radius="btn"
              onClick={acceptContract}
            >
              수락
            </Button>
          </div>
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
