import { useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi2';

export default function AboutMe() {
  // 모달 열림, 한줄 소개 입력 값, 임시 값 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introduce, setIntroduce] =
    useState<string>('한줄 소개가 여기에 들어갑니다.');
  const [asPeriod, setAsPeriod] = useState<string>('1개월 이하');
  const [tempIntroduce, setTempIntroduce] = useState<string>(introduce);
  const [tempAsPeriod, setTempAsPeriod] = useState<string>(asPeriod);

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
      <div className="mt-6 w-full h-6 font-bold text-zp-xs flex items-center justify-start space-x-1">
        <div>
          <HiOutlineUser />
        </div>
        <div>About Me</div>
      </div>

      <div className="relative w-full bg-zp-white p-4 rounded-zp-radius-big">
        <div className="text-zp-2xs flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="w-20">나이</div>
            <div className="border-l border-black h-full mx-2"></div>
            <div className="flex-grow">30</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">E-MAIL</div>
            <div className="border-l border-black h-full mx-2"></div>
            <div className="flex-grow">saffy@ssafy.com</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">경력</div>
            <div className="border-l border-black h-full mx-2"></div>
            <div className="flex-grow">남성</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">누적 시공수</div>
            <div className="border-l border-black h-full mx-2"></div>
            <div className="flex-grow">{introduce}</div>
          </div>
          <div className="flex items-center">
            <div className="w-20">A/S 보증 기간</div>
            <div className="border-l border-black h-full mx-2"></div>
            <div className="flex-grow">{asPeriod}</div>
          </div>
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
          <div className="border border-zp-main-color rounded-zp-radius-big bg-zp-white p-6 shadow-lg w-[300px]">
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
    </>
  );
}
