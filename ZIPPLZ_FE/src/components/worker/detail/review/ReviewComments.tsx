import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const comments = [
  {
    id: 1,
    profilePic: 'https://via.placeholder.com/40',
    name: '홍길동',
    rating: 4,
    date: '24.07.17',
    content: '작업이 빠르고 깔끔하게 진행되었습니다.',
    replies: [
      {
        id: 1,
        profilePic: 'https://via.placeholder.com/40',
        name: '김철수',
        date: '24.07.18',
        content: '빠른 답변과 도움 감사드립니다!',
      },
    ],
  },
  // 다른 댓글 예시를 추가할 수 있습니다.
];

export default function ReviewComments() {
  const [showReplyBox, setShowReplyBox] = useState(null);

  const handleReplyButtonClick = (commentId) => {
    setShowReplyBox(showReplyBox === commentId ? null : commentId);
  };
  return (
    <>
      <div className="font-bold text-zp-xs">리뷰</div>
      {/* 댓글 */}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="mt-4 p-4 rounded-zp-radius-big mb-4 bg-zp-white"
        >
          <div className="flex items-center space-x-4 mb-2">
            <img
              src={comment.profilePic}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="font-bold text-zp-xs">{comment.name}</div>
              <div className="flex items-center space-x-1">
                {[...Array(comment.rating)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500 text-xs" />
                ))}
                {[...Array(5 - comment.rating)].map((_, index) => (
                  <FaStar key={index} className="text-gray-300 text-xs" />
                ))}
              </div>
              <div className="text-zp-2xs text-gray-500">{comment.date}</div>
            </div>
          </div>
          <div className="text-zp-2xs">{comment.content}</div>
          {/* 대댓글 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={() => handleReplyButtonClick(comment.id)}
              className="text-zp-main-color font-bold text-zp-2xs"
            >
              댓글 달기
            </button>
          </div>
          {showReplyBox === comment.id && (
            <div className="mt-2 bg-zp-light-beige p-4 rounded-zp-radius-big">
              <textarea
                rows="3"
                placeholder="대댓글을 작성하세요..."
                className="w-full mt-2 p-2 border border-zp-sub-color rounded"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowReplyBox(null)}
                  className="text-zp-main-color font-bold text-zp-2xs"
                >
                  올리기
                </button>
              </div>
            </div>
          )}
          {comment.replies.map((reply) => (
            <div
              key={reply.id}
              className="mt-2 bg-zp-light-beige p-4 rounded-zp-radius-big"
            >
              <div className="flex items-center space-x-4 mb-2">
                <img
                  src={reply.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="font-bold text-zp-xs">{reply.name}</div>
                  <div className="text-zp-2xs text-gray-500">{reply.date}</div>
                </div>
              </div>
              <div className="text-zp-2xs">{reply.content}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
