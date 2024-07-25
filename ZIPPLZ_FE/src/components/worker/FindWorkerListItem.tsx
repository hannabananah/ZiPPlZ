// 워커찾기-전문 시공자 둘러보기 페이지의 시공자 정보 컴포넌트
import { CgProfile } from 'react-icons/cg';
import { MdElectricalServices } from 'react-icons/md';

export default function FindWorkerListItem() {
  return (
    <>
      <div className="rounded-zp-radius-big p-4 bg-white border border-gray-200 rounded-lg shadow-md w-64">
        {/* 사진 파일 */}
        <div className="w-40 h-40 grid place-items-center mx-auto">
          <CgProfile size={128} />
        </div>
        <div className="flex flex-col items-start mt-4 space-y-2">
          {/* 이름 + 나이 + 공종 아이콘 */}
          <div className="w-full flex items-center space-x-2 font-['nanum']">
            <span className="font-bold text-zp-sm">이가은</span>
            <span className="text-zp-2xs text-zp-gray">1999년생</span>
            <MdElectricalServices />
          </div>
          {/* 온도 */}
          <div className="w-full font-['nanum'] text-left">36.5°C</div>
          {/* 지역 */}
          <div className="w-full font-['nanum'] text-zp-2xs text-left">
            서울시 강남구, 서울시 서초구, 제주 서귀포시, 경기 포천시, 전북
            익산시
          </div>
          {/* 공종 + 경력 */}
          <div className="w-full flex justify-start items-center space-x-2 font-['nanum']">
            <span className="font-bold">전기</span>
            <span>경력 3년</span>
          </div>
        </div>
      </div>
    </>
  );
}
