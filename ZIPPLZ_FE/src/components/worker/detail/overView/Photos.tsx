// Import Swiper styles
import 'swiper/css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Photos() {
  return (
    <>
      <div className="mt-6 w-full h-6 font-bold text-zp-xs">Photos</div>
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
    </>
  );
}
