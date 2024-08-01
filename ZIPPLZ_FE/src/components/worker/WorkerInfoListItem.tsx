import { CgProfile } from 'react-icons/cg';
import { MdElectricalServices } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function WorkerInfoListItem() {
  const navigate = useNavigate();
  return (
    <div
      className="p-2 rounded-zp-radius-big border border-zp-light-beige shadow-lg flex flex-col items-center"
      onClick={() => navigate('/OverView')}
    >
      {/* 사진 파일 */}
      <div className="flex items-center justify-center">
        <CgProfile size={93} />
      </div>
      <div className="flex flex-col items-start px-2">
        {/* 이름 + 나이 + 공종 아이콘 */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-left font-bold text-zp-sm">이가은</div>
          <div className="text-zp-2xs text-zp-gray">1999년생</div>
          <MdElectricalServices />
        </div>
        {/* 온도 */}
        <div className="text-zp-2xs">36.5°C</div>
        {/* 지역 */}
        <div className="text-zp-2xs  mb-2">
          서울시 강남구, 서울시 서초구, 제주 서귀포시, 경기 포천시, 전북 익산시
        </div>
        {/* 공종 + 경력 */}
        <div className="space-x-2">
          <span className="text-zp-2xs font-bold text-left">전기</span>
          <span className="text-zp-2xs">경력 3년</span>
        </div>
      </div>
    </div>
  );
}
