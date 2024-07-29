import React, { useState } from 'react';
import { PiNotePencil } from 'react-icons/pi';

// Import Swiper styles
import 'swiper/css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Portfolio from '../Portfolio';

export default function OverView() {
  // 모달 열림, 한줄 소개 입력 값, 임시 값 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [introduce, setIntroduce] = useState('한줄 소개가 여기에 들어갑니다.');
  const [asPeriod, setAsPeriod] = useState('1개월 이하');
  const [tempIntroduce, setTempIntroduce] = useState(introduce);
  const [tempAsPeriod, setTempAsPeriod] = useState(asPeriod);

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
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* Portfolio 컴포넌트 상단에 배치 */}
          <Portfolio />

          <div className="mt-6 w-24 h-6 font-bold text-zp-xs flex items-center justify-start">
            <div>About Me</div>
          </div>

          {/* 우측 상단에 글쓰기 버튼 누르면, 한줄 소개와 A/S 기간을 선택할 수 있는 modal 창 */}
          <div className="relative w-full bg-zp-white p-4 rounded-zp-radius-big">
            <PiNotePencil
              onClick={handleOpenModal}
              className="absolute top-4 right-4 cursor-pointer"
              size={24}
            />
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
                <div className="w-20">성별</div>
                <div className="border-l border-black h-full mx-2"></div>
                <div className="flex-grow">남성</div>
              </div>
              <div className="flex items-center">
                <div className="w-20">한줄소개</div>
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

          <div className="mt-6 w-24 h-6 font-bold text-zp-xs">Photos</div>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white">
                <button className="w-40 h-40">사진1</button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white">
                <button className="w-40 h-40">사진2</button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white">
                <button className="w-40 h-40">사진3</button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white">
                <button className="w-40 h-40">사진4</button>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="mt-6 w-24 h-6 font-bold text-zp-xs">
            경력 및 자격증
          </div>
          <div className="w-full h-24 bg-zp-white p-4 rounded-zp-radius-big font-bold">
            <div className="text-zp-2xs flex flex-col space-y-2">
              <div>20.01.01 실내 건축 기사 취득</div>
              <div>20.02.01 ~ 22.03.01 ~~~~~~</div>
              <div>21.01.01 ~~~~~~~</div>
            </div>
          </div>

          <div className="mt-6 w-24 h-6 font-bold text-zp-xs">
            하고 싶은 얘기
          </div>
          <div className="w-full h-24 bg-zp-white p-4 rounded-zp-radius-big font-bold">
            <div className="text-zp-2xs flex flex-col space-y-2">
              <div>잘 부탁드려요</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
