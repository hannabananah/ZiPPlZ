// Import Swiper styles
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
      <div className="mt-6 w-full h-6 font-bold text-zp-xs">Photos</div>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        modules={[Navigation]} // Add Navigation module
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
      >
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진1</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진2</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진3</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진4</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진5</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진6</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진7</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded-zp-radius-big w-40 h-40 bg-zp-white flex items-center justify-center">
            <button className="w-32 h-32 bg-gray-200">사진8</button>
          </div>
        </SwiperSlide>
        {/* Swiper Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button className="swiper-button-prev"></button>
          <button className="swiper-button-next"></button>
        </div>
      </Swiper>
    </>
  );
}
