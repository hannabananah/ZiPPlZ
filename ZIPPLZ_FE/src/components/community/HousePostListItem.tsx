import { FaRegBookmark, FaRegComment, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface HousePost {
  post_serial: number;
  post_image: string | null;
  title: string;
  profile_image: string | null;
  nickname: string;
  upload_date: Date;
  view_cnt: number;
  bookmark_cnt: number;
  comment_cnt: number;
}

export default function HousePostListItem({
  post_serial,
  post_image,
  title,
  profile_image,
  nickname,
  upload_date,
  view_cnt,
  bookmark_cnt,
  comment_cnt,
}: HousePost) {
  const navigate = useNavigate();

  return (
    <div
      className="h-64 p-2 rounded-zp-radius-big border border-zp-light-beige shadow-lg flex flex-col"
      onClick={() => navigate(`/HousePostDetail`)}
      // onClick={() => navigate(`/OverView/${post_serial}`)}
    >
      {/* 이미지 */}
      <div className="flex items-center justify-center">
        {post_image ? (
          <img
            src={post_image}
            alt="Post"
            className="h-24 w-full object-cover rounded-t-zp-radius-big"
          />
        ) : (
          <div className="h-24 w-full bg-gray-200 rounded-t-zp-radius-big" />
        )}
      </div>
      {/* 제목 */}
      <div className="text-left font-bold text-zp-xs mt-2">{title}</div>
      {/* 프로필 및 닉네임 */}
      <div className="flex items-center mt-2">
        {profile_image ? (
          <img
            src={profile_image}
            alt="Profile"
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <div className="h-6 w-6 bg-gray-200 rounded-full" />
        )}
        <div className="ml-2 text-zp-sm">{nickname}</div>
      </div>
      {/* 업로드 날짜 */}
      <div className="text-zp-2xs text-zp-gray mt-1">
        {new Date(upload_date).toLocaleDateString('ko-KR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
      {/* 조회수, 북마크, 댓글 */}
      <div className="flex items-center mt-2 space-x-2">
        <div className="flex items-center text-zp-2xs">
          <FaRegEye className="mr-1" /> {view_cnt}
        </div>
        <div className="flex items-center text-zp-2xs">
          <FaRegBookmark className="mr-1" /> {bookmark_cnt}
        </div>
        <div className="flex items-center text-zp-2xs">
          <FaRegComment className="mr-1" /> {comment_cnt}
        </div>
      </div>
    </div>
  );
}
