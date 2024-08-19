import { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi2';

export default function AboutMe() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introduce, setIntroduce] =
    useState<string>('한줄 소개가 여기에 들어갑니다.');
  const [asPeriod, setAsPeriod] = useState<string>('1개월 이하');
  const [tempIntroduce, setTempIntroduce] = useState<string>(introduce);
  const [tempAsPeriod, setTempAsPeriod] = useState<string>(asPeriod);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setIntroduce(tempIntroduce);
    setAsPeriod(tempAsPeriod);
    handleCloseModal();
  };

  return (
    <>
      <div className="flex items-center justify-start w-full h-6 mt-6 space-x-1 font-bold text-zp-xs">
        <div>
          <HiOutlineUser />
        </div>
        <div>About Me</div>
      </div>

      <div className="relative w-full p-4 bg-zp-white rounded-zp-radius-big drop-shadow-zp-slight">
        <div className="flex flex-col space-y-2 text-zp-2xs">
          <div className="flex items-center">
            <div className="w-20">나이</div>
            <div className="h-full mx-2 border-black"></div>
            <div className="flex-grow text-zp-gray">30</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">E-MAIL</div>
            <div className="h-full mx-2 border-black"></div>
            <div className="flex-grow text-zp-gray">saffy@ssafy.com</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">경력</div>
            <div className="h-full mx-2 border-black"></div>
            <div className="flex-grow text-zp-gray">남성</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">누적 시공수</div>
            <div className="h-full mx-2 border-black"></div>
            <div className="flex-grow text-zp-gray">{introduce}</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">A/S 보증 기간</div>
            <div className="h-full mx-2 border-black"></div>
            <div className="flex-grow text-zp-gray">{asPeriod}</div>
          </div>
        </div>
      </div>

      {/* 모달 창 */}
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
              한줄소개 및 A/S 기간 수정
            </div>
            <div className="mb-4">
              <label className="block mb-1">한줄 소개</label>
              <input
                type="text"
                value={tempIntroduce}
                onChange={(e) => setTempIntroduce(e.target.value)}
                className="w-full p-2 border border-gray-300"
              />
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
