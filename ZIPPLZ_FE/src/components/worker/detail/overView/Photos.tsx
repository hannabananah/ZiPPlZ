// Import Swiper styles
import { TbPhoto } from 'react-icons/tb';

import 'swiper/css';
import 'swiper/css/navigation';
// Import Swiper styles for navigation
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Photos() {
  return (
    <>
      <div className="mt-6 w-full h-6 font-bold text-zp-xs flex justify-start space-x-1">
        <TbPhoto />
        <div>Photos</div>
      </div>
      <Swiper
        // 사진 간 간격
        spaceBetween={10}
        // 한 페이지에 보이는 사진의 개수 지정
        slidesPerView={3}
        modules={[Navigation]} // Add Navigation module
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="w-full" // Ensure Swiper takes full width of its container
      >
        {/* API 연동 전 임시 하드 코딩 */}
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진1
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진2
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진3
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진4
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진5
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진6
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진7
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
              사진8
            </button>
          </div>
        </SwiperSlide>
        {/* Swiper Navigation Buttons */}
        <div className="flex justify-between">
          <button className="swiper-button-prev text-zp-black"></button>
          <button className="swiper-button-next text-zp-black"></button>
        </div>
      </Swiper>
    </>
  );
}
