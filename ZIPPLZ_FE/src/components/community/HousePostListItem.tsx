import { CgProfile } from 'react-icons/cg';
import { FaRegBookmark, FaRegComment, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import type { HousePost } from '@/types';

export default function HousePostListItem({
  post_serial,
  title,
  post_image,
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
      className="flex flex-col h-64 p-2 border shadow-lg rounded-zp-radius-big border-zp-light-beige"
      onClick={() => navigate(`/housepost/${post_serial}`)}
    >
      {/* 이미지 */}
      <div className="flex items-center justify-center w-full">
        {post_image ? (
          <img
            src={post_image}
            alt="Post"
            className="object-cover w-full h-24 rounded-t-zp-radius-big"
          />
        ) : (
          <div className="w-full h-24 bg-gray-200 rounded-t-zp-radius-big" />
        )}
      </div>
      {/* 제목 */}
      <div className="mt-2 font-bold text-left text-zp-xs">{title}</div>
      {/* 프로필 및 닉네임 */}
      <div className="flex items-center mt-2">
        {profile_image ? (
          <img
            src={profile_image}
            alt="Profile"
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <CgProfile className="w-6 h-6 text-gray-400" />
        )}
        <div className="ml-2 text-zp-sm">{nickname}</div>
      </div>
      {/* 업로드 날짜 */}
      <div className="mt-1 text-zp-2xs text-zp-gray">
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
