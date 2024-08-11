import { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi2';
import { PiNotePencil } from 'react-icons/pi';
import { RiMessage2Line } from 'react-icons/ri';
import { TbBuildingCommunity } from 'react-icons/tb';

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
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-end">
          <PiNotePencil
            onClick={handleOpenModal}
            className="cursor-pointer"
            size={24}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <HiOutlineUser size={16} />
            <p className="font-bold text-zp-sm">About Me</p>
          </div>
          <div className="flex w-full gap-4 pl-4 mt-4">
            <div className="flex flex-col gap-2 pr-6 border-r text-zp-gray text-zp-2xs border-r-zp-sub-color">
              <p>나이</p>
              <p>E-Mail</p>
              <p>경력</p>
              <p>누적 시공 수</p>
              <p>A/S 기간</p>
            </div>
            <div className="flex flex-col gap-2 text-zp-gray text-zp-2xs ">
              <p>나이</p>
              <p>E-Mail</p>
              <p>경력</p>
              <p>누적 시공 수</p>
              <p>A/S 기간</p>
            </div>
          </div>
        </div>
        <hr className="w-full text-zp-main-color" />
        {/* 사진 표시 컴포넌트 */}
        <div
          className="flex w-full gap-4 overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex-shrink-0 w-[25%] aspect-square border" />
          <div className="flex-shrink-0 w-[25%] aspect-square border" />
          <div className="flex-shrink-0 w-[25%] aspect-square border" />
          <div className="flex-shrink-0 w-[25%] aspect-square border" />
          <div className="flex-shrink-0 w-[25%] aspect-square border" />
          <div className="flex-shrink-0 w-[25%] aspect-square border" />
        </div>

        <hr className="w-full text-zp-main-color" />

        {/* 소속업체 */}
        <div className="flex items-center gap-1">
          <TbBuildingCommunity size={16} />
          <p className="font-bold text-zp-sm">소속업체</p>
        </div>
        <div className="flex w-full gap-4 pl-4">
          <div className="flex flex-col gap-2 pr-6 border-r text-zp-gray text-zp-2xs border-r-zp-sub-color">
            <p>업체명</p>
            <p>업체 주소</p>
            <p>사업자등록번호</p>
          </div>
          <div className="flex flex-col gap-2 text-zp-gray text-zp-2xs ">
            <p>업체명</p>
            <p>업체 주소</p>
            <p>사업자등록번호</p>
          </div>
        </div>
        <hr className="w-full text-zp-main-color" />

        {/* 하고 싶은 말 */}
        <div className="flex items-center gap-1">
          <RiMessage2Line size={16} />
          <p className="font-bold text-zp-sm">하고 싶은 말</p>
        </div>
        <p className="pl-4 font-bold text-zp-2xs">다 고쳐야 되네......</p>
      </div>
      {/* 수정 모달 창 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 오버레이 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          ></div>
          {/* 모달 창 */}
          <div className="border border-zp-main-color rounded-zp-radius-big bg-zp-white p-6 shadow-lg w-[300px]">
            <div className="mb-4 text-lg font-bold">
              A/S 보증 기간 수정 및 한줄소개
            </div>

            <div className="mb-4">
              <label className="block mb-1">A/S 기간</label>
              <select
                value={tempAsPeriod}
                onChange={(e) => setTempAsPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300"
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
                className="w-full p-2 border border-gray-300"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 mr-2 text-black bg-gray-300 rounded"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
