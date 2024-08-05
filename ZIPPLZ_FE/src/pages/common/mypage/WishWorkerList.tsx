import React from 'react';
import { GoArrowLeft } from 'react-icons/go';

function WishWorkerList() {
  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full">
          {/* 뒤로가기 버튼 + "마이페이지" 글자 */}
          <div className="flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                size={20} // 아이콘 크기 조정
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-3xl font-bold text-center">
              관심있는 시공업자
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishWorkerList;
