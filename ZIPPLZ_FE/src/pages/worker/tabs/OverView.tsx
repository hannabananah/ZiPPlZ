import { useState } from 'react';
import { PiNotePencil } from 'react-icons/pi';

import AboutMe from '@components/worker/detail/overView/AboutMe';
import CareerAndCertificate from '@components/worker/detail/overView/CareerAndCertificate';
import Photos from '@components/worker/detail/overView/Photos';
import WantToTalk from '@components/worker/detail/overView/WantToTalk';

export default function OverView() {
  // 모달 열림, 한줄 소개 입력 값, 임시 값 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introduce, setIntroduce] =
    useState<string>('한줄 소개가 여기에 들어갑니다.');
  const [asPeriod, setAsPeriod] = useState<string>('1개월 이하');
  const [tempIntroduce, setTempIntroduce] = useState<string>(introduce);
  const [tempAsPeriod, setTempAsPeriod] = useState<string>(asPeriod);

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

  return (
    <>
      {/* 수정 버튼: 우측 상단에 글쓰기 버튼 누르면, 한줄 소개와 A/S 기간을 선택할 수 있는 modal 창 */}
      <div>
        <PiNotePencil
          onClick={handleOpenModal}
          className="absolute top-4 right-4 cursor-pointer"
          size={24}
        />
      </div>

      {/* 수정 모달 창 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          ></div>
          {/* 모달 창 */}
          <div className="border border-zp-main-color rounded-zp-radius-big bg-zp-white p-6 shadow-lg w-[300px]">
            <div className="text-lg font-bold mb-4">
              A/S 보증 기간 수정 및 한줄소개
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

            <div className="mb-4">
              <label className="block mb-1">하고 싶은 말</label>
              <input
                type="text"
                value={tempIntroduce}
                onChange={(e) => setTempIntroduce(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              />
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

      {/* About Me 컴포넌트 */}
      <AboutMe />

      <div className="py-6">
        <hr className="border-t-2 border-zp-light-gray" />
      </div>

      {/* 사진 표시 컴포넌트 */}
      <Photos />

      <div className="py-6">
        <hr className="border-t-2 border-zp-light-gray" />
      </div>

      {/* 소속업체 */}
      <CareerAndCertificate />

      <div className="py-6">
        <hr className="border-t-2 border-zp-light-gray" />
      </div>

      {/* 하고 싶은 말 */}
      <WantToTalk />
    </>
  );
}
