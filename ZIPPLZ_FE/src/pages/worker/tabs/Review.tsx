import React from 'react';
import { IoHammerOutline } from 'react-icons/io5';
import { TbMoodCry, TbMoodHappy } from 'react-icons/tb';

import Portfolio from '../Portfolio';

const manners = {
  기술: 5.0, // 별점 5.0 기준
  커뮤니케이션: 4.0,
  작업완성도: 4.1,
  추천의사: 3.2,
};

export default function Review() {
  return (
    <>
      {/* Portfolio 컴포넌트 상단에 배치 */}
      <Portfolio />

      <div className="font-['nanum'] font-bold text-zp-xs flex items-center space-x-4 mb-8">
        <IoHammerOutline className="text-zp-main-color text-2xl" />
        <div className="flex flex-col space-y-2">
          <div className="font-['nanum'] text-zp-xs">매너 온도</div>
          {/* 매너 온도 bar */}
          <div className="relative w-64 h-4 bg-zp-sub-color rounded-zp-radius-btn">
            <div
              className="absolute top-0 left-0 h-full bg-zp-main-color rounded-zp-radius-btn"
              style={{ width: `56.5%` }} // 56.5도 기준
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-zp-xs text-zp-white">
              56.5°C
            </span>
          </div>
        </div>
      </div>

      <div className="font-['nanum'] font-bold text-zp-xs mb-4">
        분야별 매너 온도
      </div>

      {/* 분야별 매너 온도 bar들 */}
      {Object.entries(manners).map(([category, score]) => (
        <div
          key={category}
          className="bg-zp-light-beige p-4 rounded-zp-radius-big mb-4 flex items-center space-x-4"
        >
          <div className="font-['nanum'] text-zp-2xs">{category}</div>
          <div className="relative flex-1">
            <div className="relative h-4 bg-zp-sub-color rounded-zp-radius-btn">
              <div
                className="absolute top-0 left-0 h-full bg-zp-main-color rounded-zp-radius-btn"
                style={{ width: `${(score / 5.0) * 100}%` }} // 별점 5.0 기준
              ></div>
            </div>
          </div>
          <div className="font-['nanum'] text-zp-2xs ml-2">
            {score.toFixed(1)}
          </div>
        </div>
      ))}

      <div className="font-['nanum'] font-bold text-zp-xs flex items-center space-x-2 mb-8">
        <TbMoodHappy className="text-zp-main-color text-2xl" />
        <span>[시공업자 이름]님은 이래서 좋아요</span>
      </div>

      <div className="bg-zp-light-beige p-4 rounded-zp-radius-big mb-8">
        <div className="font-['nanum'] text-zp-2xs flex flex-col space-y-2">
          <div>응답이 빨라서 좋아요ㅎㅎ</div>
          <div>뒷정리가 깔끔합니다ㅎㅎ</div>
          <div>A/S가 좋아요ㅎㅎ</div>
        </div>
      </div>

      <div className="font-['nanum'] font-bold text-zp-xs flex items-center space-x-2 mb-8">
        <TbMoodCry className="text-zp-main-color text-2xl" />
        <span>[시공업자 이름]님의 이런 모습이 고쳐졌으면 좋겠어요</span>
      </div>

      <div className="bg-zp-light-beige p-4 rounded-zp-radius-big mb-8">
        <div className="font-['nanum'] text-zp-2xs flex flex-col space-y-2">
          <div>뒷정리가 하나도 안돼요...</div>
          <div>담배냄새가 너무 납니다...</div>
          <div>답장이 느려요...</div>
        </div>
      </div>

      <div className="font-['nanum'] font-bold text-zp-xs">리뷰</div>
      {/* 고객 프사, 고객 이름, 별 이미지, 평점, 날짜(24.07.17) 표시 */}
      {/* 리뷰 내용 표시 */}
      {/* 댓글 달기 button */}
      {/* 댓글 달기 button 누르면 대댓글 창 활성화 */}
    </>
  );
}
