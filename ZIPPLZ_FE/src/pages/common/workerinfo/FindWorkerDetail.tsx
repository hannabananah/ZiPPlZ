import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { GoArrowLeft } from 'react-icons/go';
import {
  IoBookmark,
  IoBookmarkOutline,
  IoChatbubblesOutline,
} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';

// FindWorkerDetail 컴포넌트 정의
const FindWorkerDetail: React.FC = () => {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/FindWorkerList');
  };

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // 찜하기 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setIsBookmarked((prev) => !prev); // 상태를 토글하여 버튼 유형 변경
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-3xl">
        {/* 나가기 버튼, 구인 글쓰기 text */}
        <div className="w-full flex items-center justify-between relative">
          <div className="flex items-center">
            <GoArrowLeft
              className="mr-6 cursor-pointer"
              onClick={handleGoBack}
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-xl font-bold text-center">
            시공자 찾기
          </div>
        </div>

        {/* 글 제목 */}
        <div className="pt-6 text-zp-xl font-bold">
          깔끔하고 하자 없는 장판 시공 해주실분 구합니다.
        </div>

        {/* 글쓴이 프로필 사진, 닉네임, 주소 */}
        <div className="pt-6 pb-2 flex items-center space-x-2">
          <div>
            <CgProfile />
          </div>
          <div className="text-zp-xs font-bold">눈누난나</div>
        </div>

        <div className="rounded-zp-radius-big border-zp-main-color bg-zp-white p-4 border border-gray-300 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div>
              <CiLocationOn size={20} />
            </div>
            <div className="text-zp-2xs">Location</div>
          </div>
          <div className="text-zp-xs font-bold">
            인천광역시 부평구 부평문화로 37 (부평동, 부평동아이파트)
          </div>
        </div>

        {/* 작업내용 */}
        <div className="w-full h-1/2">
          <div className="pt-6 pb-2 text-zp-lg font-bold">작업내용</div>
          <div className="w-full h-1/2 text-zp-xs font-bold text-zp-gray">
            모던하면서도 너무 밋밋하지 않은 디자인의 장판으로 바닥을 한번 싹다
            바꿔볼까하는데 잘 해주시는 분 찾고 있습니다. 시공쪽을 잘 몰라서
            친절하게 알려주실 분 계신가요? 모던하면서도 너무 밋밋하지 않은
            디자인의 장판으로 바닥을 한번 싹다 바꿔볼까하는데 잘 해주시는 분
            찾고 있습니다. 음하 모던하면서도 너무 밋밋하지 않은 디자인의
            장판으로 바닥을 한번 싹다 바꿔볼까하는데 잘 해주시는 분 찾고
            있습니다. 시공쪽을 잘 몰라서 친절하게 알려주실 분 계신가요?
            모던하면서도 너무 밋밋하지 않은 디자인의 장판으로 바닥을 한번 싹다
            바꿔볼까하는데 잘 해주시는 분 찾고 있습니다. 음하 모던하면서도 너무
            밋밋하지 않은 디자인의 장판으로 바닥을 한번 싹다 바꿔볼까하는데 잘
            해주시는 분 찾고 있습니다. 시공쪽을 잘 몰라서 친절하게 알려주실 분
            계신가요? 모던하면서도 너무 밋밋하지 않은 디자인의 장판으로 바닥을
            한번 싹다 바꿔볼까하는데 잘 해주시는 분 찾고 있습니다. 음나냐~
          </div>
        </div>

        <hr className="mt-6" />

        <div className="font-bold flex items-center space-x-4">
          {/* 찜하기 버튼 */}
          <div className="flex-grow sm:flex-grow-0 flex justify-center items-center space-x-2 my-4">
            <div className="relative border border-zp-sub-color rounded-zp-radius-btn w-full max-w-[200px]">
              <Button
                buttonType={isBookmarked ? 'normal' : 'light'}
                width="full"
                height={3}
                fontSize="xl"
                radius="btn"
                onClick={handleButtonClick}
                className="flex items-center justify-center w-full"
              >
                {isBookmarked ? (
                  <IoBookmark size={24} className="text-zp-main-color" />
                ) : (
                  <IoBookmarkOutline size={24} className="text-gray-500" />
                )}
                <span className="ml-2">찜하기</span>
              </Button>
            </div>
          </div>

          {/* 채팅하기 버튼 */}
          <div className="flex-grow sm:flex-grow-0 flex justify-center items-center">
            <div className="relative w-full max-w-[250px]">
              <Button
                buttonType="second"
                width="full"
                height={3}
                fontSize="xl"
                radius="btn"
                onClick={() =>
                  alert(
                    '현재 화면의 채팅하기 버튼을 누르면 해당 글쓴이와의 채팅방이 열립니다'
                  )
                }
                className="flex items-center justify-center w-full"
              >
                <IoChatbubblesOutline size={24} />
                <span className="ml-2">채팅하기</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindWorkerDetail;
