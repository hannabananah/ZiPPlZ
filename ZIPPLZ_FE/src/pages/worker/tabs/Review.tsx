import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoHammerOutline } from 'react-icons/io5';
import { TbMoodCry, TbMoodHappy } from 'react-icons/tb';

import Portfolio from '../Portfolio';

const manners = {
  기술: 5.0, // 별점 5.0 기준
  커뮤니케이션: 4.0,
  작업완성도: 4.1,
  추천의사: 3.2,
};

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

export default function Review() {
  const [showReplyBox, setShowReplyBox] = useState(null);

  const handleReplyButtonClick = (commentId) => {
    setShowReplyBox(showReplyBox === commentId ? null : commentId);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* Portfolio 컴포넌트 상단에 배치 */}
          <Portfolio />

          <div className="mt-6 font-bold text-zp-xs">매너 온도</div>
          <div className="mt-2 font-bold text-zp-xs flex items-center space-x-4 mb-8">
            <IoHammerOutline size={20} />
            <div className="flex flex-col space-y-2">
              {/* 매너 온도 bar */}
              <div className="relative w-[460px] h-6 bg-zp-sub-color rounded-zp-radius-big">
                <div
                  className="absolute top-0 left-0 h-full bg-zp-main-color rounded-zp-radius-big"
                  style={{ width: `56.5%` }} // 56.5도 기준
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-zp-xs text-zp-white">
                  56.5°C
                </span>
              </div>
            </div>
          </div>

          <div className="font-bold text-zp-xs mb-4">분야별 매너 온도</div>

          {/* 분야별 매너 온도 bar들 */}
          <div className="flex flex-col space-y-4">
            {Object.entries(manners).map(([category, score]) => (
              <div
                key={category}
                className="bg-zp-light-beige p-2 rounded-zp-radius-big flex items-center"
              >
                <div className="text-zp-2xs flex-shrink-0 w-24">{category}</div>
                {/* progress bar 기본색, 채움색, bar 채우기 수식 */}
                <div className="flex-1 relative w-full h-4 bg-zp-sub-color rounded-zp-radius-big mx-2">
                  <div
                    className="absolute top-0 left-0 h-full bg-zp-yellow rounded-zp-radius-big"
                    style={{ width: `${(score / 5.0) * 100}%` }} // 별점 5.0 기준
                  ></div>
                </div>
                <div className="text-zp-2xs font-bold w-12 text-right">
                  {score.toFixed(1)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 font-bold text-zp-xs flex items-center space-x-2">
            <TbMoodHappy className="text-zp-main-color text-2xl" />
            <span>[시공업자 이름]님은 이래서 좋아요</span>
          </div>

          <div className="mt-2 bg-zp-white p-4 rounded-zp-radius-big mb-8">
            <div className="text-zp-2xs flex flex-col space-y-2">
              <div>응답이 빨라서 좋아요ㅎㅎ</div>
              <div>뒷정리가 깔끔합니다ㅎㅎ</div>
              <div>A/S가 좋아요ㅎㅎ</div>
            </div>
          </div>

          <div className="font-bold text-zp-xs flex items-center space-x-2">
            <TbMoodCry className="text-zp-main-color text-2xl" />
            <span>[시공업자 이름]님의 이런 모습이 고쳐졌으면 좋겠어요</span>
          </div>

          <div className="mt-2 bg-zp-white p-4 rounded-zp-radius-big mb-8">
            <div className="text-zp-2xs flex flex-col space-y-2">
              <div>뒷정리가 하나도 안돼요...</div>
              <div>담배냄새가 너무 납니다...</div>
              <div>답장이 느려요...</div>
            </div>
          </div>

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
                  <div className="text-zp-2xs text-gray-500">
                    {comment.date}
                  </div>
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
                      <div className="text-zp-2xs text-gray-500">
                        {reply.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-zp-2xs">{reply.content}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
