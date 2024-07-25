import React from 'react';
import { MdOpenInFull } from 'react-icons/md';

import Portfolio from '../Portfolio';

export default function WorkerSchedule() {
  // 현재 날짜를 `7.25` 형식으로 변환
  const formatDate = (date) => {
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const day = date.getDate();
    return `${month}.${day}`;
  };

  const todayDate = formatDate(new Date());

  return (
    <>
      {/* Portfolio 컴포넌트 상단에 배치 */}
      <Portfolio />
      <div>해당 시공자 달력 화면</div>
      <div className="mt-6 mb-6 w-32 h-6 font-['nanum'] text-zp-xl font-bold">
        {todayDate}
      </div>

      {/* 고객과의 일정, 채팅 연결 버튼이 있는 컴포넌트 */}
      <div className="w-60 h-36 bg-zp-light-beige p-4 rounded-zp-radius-big font-bold">
        <div className="font-['nanum'] text-zp-lg">승범백</div>
        <div className="font-['nanum'] text-zp-2xs">
          시공기간: 07.09 ~ 07.11
        </div>
        <div className="font-['nanum'] text-zp-2xs">출장 장소: 전남 순천</div>
        <button className="font-['nanum'] text-zp-2xs">채팅하기</button>
      </div>
      {/* 우측 하단 컴포넌트는 현태가 만든 컴포넌트 적용할 예정  */}
      {/* 시공업자의 대표 사진 3개가 보이는 컴포넌트 */}
      {/* 대표 사진이 없으면 "사진이 없습니다"라는 메시지가 보임 */}
      {/* 확대 버튼 누르면 */}
      {/* 본인에 대해 고객들이 남긴 메모들이 2개 보이는 컴포넌트 */}
      {/* 최근 후기가 없다면 "후기가 없습니다"라는 메시지가 보임 */}
      {/* 확대 버튼 누르면 후기 상세 페이지로 이동 */}
      <div className="w-60 h-18 bg-zp-light-beige p-4 rounded-zp-radius-big font-bold">
        <MdOpenInFull />
        <div className="font-['nanum'] text-zp-2xs">담배는 자제해주세요..</div>
        <div className="font-['nanum'] text-zp-2xs">담배는 자제해주세요..</div>
      </div>
    </>
  );
}
