import React, { useState } from 'react';
import { PiNotePencil } from 'react-icons/pi';

import Portfolio from '../Portfolio';

// 사진 데이터
const photos = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150?text=Photo+2',
  'https://via.placeholder.com/150?text=Photo+3',
  'https://via.placeholder.com/150?text=Photo+4',
  'https://via.placeholder.com/150?text=Photo+5',
  'https://via.placeholder.com/150?text=Photo+6',
  // 추가 이미지 URL을 여기에 넣으세요
];

export default function OverView() {
  // 모달 열림, 한줄 소개 입력 값, 임시 값 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introduce, setIntroduce] = useState('한줄 소개가 여기에 들어갑니다.');
  const [asPeriod, setAsPeriod] = useState('1개월 이하');
  const [tempIntroduce, setTempIntroduce] = useState(introduce);
  const [tempAsPeriod, setTempAsPeriod] = useState(asPeriod);

  // 사진 carousel 상태
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // 모달 열기
  const handleOpenModal = () => {
    setTempIntroduce(introduce);
    setTempAsPeriod(asPeriod);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 저장 버튼
  const handleSave = () => {
    setIntroduce(tempIntroduce);
    setAsPeriod(tempAsPeriod);
    handleCloseModal();
  };

  // 다음 사진 보기
  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex >= photos.length - 5 ? 0 : prevIndex + 1
    );
  };

  // 이전 사진 보기
  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex <= 0 ? photos.length - 5 : prevIndex - 1
    );
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-3xl">
        {/* Portfolio 컴포넌트 상단에 배치 */}
        <Portfolio />

        <div className="mt-6 w-24 h-6 font-['nanum'] font-bold text-zp-xs flex items-center justify-start">
          <div>About Me</div>
        </div>

        {/* 우측 상단에 글쓰기 버튼 누르면, 한줄 소개와 A/S 기간을 선택할 수 있는 modal 창 */}
        <div className="w-full bg-zp-light-beige p-4 rounded-zp-radius-big">
          <PiNotePencil
            onClick={handleOpenModal}
            className="absolute top-4 right-4 cursor-pointer"
            size={24}
          />
          <div className="font-['nanum'] text-zp-2xs flex flex-col space-y-2">
            <div className="w-12 h-4">나이</div>
            <div className="w-12 h-4">E-MAIL</div>
            <div className="w-12 h-4">성별</div>
            <div className="w-12 h-4">한줄소개{introduce}</div>
            <div className="w-12 h-4">A/S 기간{asPeriod}</div>
          </div>
        </div>

        {/* 모달 창 */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* 배경 오버레이 */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={handleCloseModal}
            ></div>
            {/* 모달 창 */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] relative z-10">
              <div className="text-lg font-bold mb-4">
                한줄소개 및 A/S 기간 수정
              </div>
              <div className="mb-4">
                <label className="block mb-1">한줄 소개</label>
                <input
                  type="text"
                  value={tempIntroduce}
                  onChange={(e) => setTempIntroduce(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">A/S 기간</label>
                <select
                  value={tempAsPeriod}
                  onChange={(e) => setTempAsPeriod(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                >
                  <option value="" disabled>
                    A/S 기간을 선택해주세요
                  </option>
                  <option value="1개월 이하">1개월 이하</option>
                  <option value="1~3개월">1~3개월</option>
                  <option value="3~6개월">3~6개월</option>
                  <option value="6~12개월">6~12개월</option>
                  <option value="1년 이상">1년 이상</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                >
                  취소
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 w-24 h-6 font-['nanum'] font-bold text-zp-xs">
          Photos
        </div>

        {/* 사진 carousel */}
        <div className="relative w-full flex items-center">
          <button
            onClick={handlePrevPhoto}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black px-4 py-2 rounded z-10"
          >
            ◀
          </button>
          <div className="flex overflow-hidden w-full">
            {photos
              .slice(currentPhotoIndex, currentPhotoIndex + 5)
              .map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`carousel-${index}`}
                  className="w-32 h-32 object-cover rounded-lg mx-1"
                />
              ))}
          </div>
          <button
            onClick={handleNextPhoto}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black px-4 py-2 rounded z-10"
          >
            ▶
          </button>
        </div>

        <div className="mt-6 w-24 h-6 font-['nanum'] font-bold text-zp-xs">
          경력 및 자격증
        </div>
        <div className="w-full h-24 bg-zp-light-beige p-4 rounded-zp-radius-big font-bold">
          <div className="font-['nanum'] text-zp-2xs flex flex-col space-y-2">
            <div>20.01.01 실내 건축 기사 취득</div>
            <div>20.02.01 ~ 22.03.01 ~~~~~~</div>
            <div>21.01.01 ~~~~~~~</div>
          </div>
        </div>

        <div className="mt-6 w-24 h-6 font-['nanum'] font-bold text-zp-xs">
          하고 싶은 얘기
        </div>
        <div className="w-full h-24 bg-zp-light-beige p-4 rounded-zp-radius-big font-bold">
          <div className="font-['nanum'] text-zp-2xs flex flex-col space-y-2">
            <div>잘 부탁드려요</div>
          </div>
        </div>
      </div>
    </div>
  );
}
