import { AiOutlineMessage } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoBookmarkOutline } from 'react-icons/io5';
import { PiEyeLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

interface QuestionPost {
  post_serial: number;
  title: string;
  content: string;
  profile_image: string | null;
  nickname: string;
  calendar_image: string | null;
  upload_date: Date;
  view_cnt: number;
  bookmark_cnt: number;
  comment_cnt: number;
}

export default function QuestionPostListItem({
  post_serial,
  title,
  content,
  profile_image,
  nickname,
  calendar_image,
  upload_date,
  view_cnt,
  bookmark_cnt,
  comment_cnt,
}: QuestionPost) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full rounded-zp-radius-big h-32 shadow-lg flex items-center"
      onClick={() => navigate(`/questionpost/${post_serial}`)}
    >
      <div className="p-2 flex items-center space-x-4 w-full">
        {/* 제목 + 내용 */}
        <div className="h-20 flex flex-col border-r px-6 basis-3/5">
          <div className="text-zp-xs font-bold text-left">{title}</div>
          <div className="line-clamp-2 text-zp-2xs text-zp-gray text-left">
            {content}
          </div>
        </div>

        {/* 두 번째 요소 */}
        <div className="flex flex-col space-y-3 text-zp-gray basis-2/5">
          <div className="flex justify-start space-x-1 items-center">
            {profile_image ? (
              <img
                src={profile_image}
                alt="Profile"
                className="h-4 w-4 rounded-zp-radius-full"
              />
            ) : (
              <CgProfile size={14} />
            )}
            <div className="text-zp-2xs">{nickname}</div>
          </div>
          <div className="flex justify-start space-x-1 items-center">
            {calendar_image ? (
              <img
                src={calendar_image}
                alt="Calendar"
                className="h-4 w-4 rounded-zp-radius-full"
              />
            ) : (
              <FaRegCalendarAlt size={14} />
            )}
            <div className="text-zp-2xs">
              {new Date(upload_date).toLocaleDateString('ko-KR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
              })}
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="flex justify-start space-x-1 items-center">
              <PiEyeLight size={14} />
              <div className="text-zp-2xs">{view_cnt}</div>
            </div>
            <div className="ml-1 flex justify-start space-x-1 items-center">
              <IoBookmarkOutline size={14} />
              <div className="text-zp-2xs">{bookmark_cnt}</div>
            </div>
            <div className="ml-1 flex justify-start space-x-1 items-center">
              <AiOutlineMessage size={14} />
              <div className="text-zp-2xs">{comment_cnt}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
