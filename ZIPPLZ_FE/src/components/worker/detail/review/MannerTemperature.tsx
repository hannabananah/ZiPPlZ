import { IoHammerOutline } from 'react-icons/io5';

const manners = {
  기술: 5.0, // 별점 5.0 기준
  커뮤니케이션: 4.0,
  작업완성도: 4.1,
  추천의사: 3.2,
};

const temperature = 56.5;

export default function MannerTemperature() {
  return (
    <>
      <div className="mt-6 font-bold text-zp-xs">매너 온도</div>
      <div className="mt-2 font-bold text-zp-xs flex items-center space-x-4 mb-8">
        <div className="p-2">
          <IoHammerOutline size={30} />
        </div>

        {/* 매너 온도 bar */}
        <div className="relative w-full h-6 bg-zp-sub-color rounded-zp-radius-big">
          <div
            className="h-full bg-zp-main-color rounded-zp-radius-big"
            style={{ width: `56.5%` }} // 56.5도 기준
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-zp-xs text-zp-white">
            56.5°C
          </span>
        </div>
      </div>

      <div className="font-bold text-zp-xs mb-4">분야별 매너 온도</div>

      {/* 분야별 매너 온도 bar들 */}
      <div className="flex flex-col space-y-4">
        {Object.entries(manners).map(([category, score]) => (
          <div
            key={category}
            className="bg-zp-light-beige p-2 rounded-zp-radius-big flex items-center"
          >
            <div className="text-zp-2xs flex-shrink-0 w-24">{category}</div>
            {/* progress bar 기본색, 채움색, bar 채우기 수식 */}
            <div className="flex-1 relative w-full h-4 bg-zp-sub-color rounded-zp-radius-big mx-2">
              <div
                className="absolute top-0 left-0 h-full bg-zp-yellow rounded-zp-radius-big"
                style={{ width: `${(score / 5.0) * 100}%` }} // 별점 5.0 기준
              ></div>
            </div>
            <div className="text-zp-2xs font-bold w-12 text-right">
              {score.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
