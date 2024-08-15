import { TbPhoto } from 'react-icons/tb';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Photos() {
  return (
    <>
      <div className="flex justify-start w-full h-6 mt-6 space-x-1 font-bold text-zp-xs">
        <TbPhoto />
        <div>Photos</div>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        modules={[Navigation]} // Add Navigation module
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="w-full" // Ensure Swiper takes full width of its container
      >
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진1
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진2
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진3
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진4
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진5
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진6
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진7
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <div className="rounded-zp-radius-big bg-zp-white flex items-center justify-center w-full h-[150px] p-2">
            <button className="flex items-center justify-center w-full h-full text-xs bg-gray-200">
              사진8
            </button>
          </div>
        </SwiperSlide>
        <div className="flex justify-between">
          <button className="swiper-button-prev text-zp-black"></button>
          <button className="swiper-button-next text-zp-black"></button>
        </div>
      </Swiper>
    </>
  );
}
