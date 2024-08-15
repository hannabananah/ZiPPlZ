import { FaRegCalendarAlt } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { GrUserWorker } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

import AiInteriorIcon from '@assets/ai-interior-icon.svg';

// SVG 파일 import

export default function DontUseZIPPLZ() {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // AI 인테리어 기능 페이지로 이동하는 핸들러
  // 임시로 홈으로 가게 해놓음
  const handleNavigateToPage = () => {
    navigate('/image-change/:userSerial');
  };

  // 홈으로 핸들러
  const handleHome = () => {
    navigate('/');
  };

  // 탈퇴하기 핸들러
  const handleResign = () => {
    navigate('/mypage/beforeresign');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen p-6 bg-gray-100">
        <div className="w-full">
          {/* 뒤로가기 버튼 */}
          <div className="mt-8 flex items-center">
            <GoArrowLeft
              className="mr-6 cursor-pointer"
              onClick={handleGoBack}
              size={20} // 아이콘 크기 조정
            />
          </div>

          <div className="mt-6 w-full">
            <div className="text-zp-2xl font-bold">이런 기능도 써보셨나요?</div>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="mt-6 flex justify-center mb-6">
                <img
                  src={AiInteriorIcon}
                  alt="AI 인테리어 아이콘"
                  width={100}
                  height={100}
                />
              </div>
              <div className="h-2 font-bold text-zp-xl mb-4">
                편리하게 10분만에
              </div>
              <div className="h-10 font-bold text-zp-2xl mb-2">AI 인테리어</div>
              {/* 이용하기 버튼 */}
              <button onClick={handleNavigateToPage} className="w-full">
                <div className="h-10 w-full font-bold text-zp-xl bg-zp-sub-color rounded-zp-radius-btn flex items-center justify-center cursor-pointer">
                  이용하기
                </div>
              </button>
            </div>
          </div>

          <hr className="mt-6 w-full border-zp-main-color" />

          <div className="mt-6 flex items">
            <div>
              <FaRegCalendarAlt size={36} />
            </div>
            <div className="relative bottom-1 h-5 p-2 font-bold text-zp-xs">
              캘린더
              <div className="font-bold text-zp-gray text-zp-xs">
                나만의 인테리어 일정 세우기
              </div>
            </div>
          </div>

          <div className="mt-6 flex items">
            <div>
              <GrUserWorker size={36} />
            </div>
            <div className="relative bottom-1 h-5 p-2 font-bold text-zp-xs">
              시공자 검색
              <div className="font-bold text-zp-gray text-zp-xs">
                공종별 최고의 시공 전문가와 함께 인테리어 하기
              </div>
            </div>
          </div>
        </div>

        {/* 홈으로 + 넘어가기 버튼 */}
        <div className="flex justify-center space-x-4">
          <button onClick={handleHome} className="w-1/2">
            <div className="mt-6 font-bold h-10 rounded-zp-radius-btn bg-zp-sub-color flex justify-center items-center cursor-pointer">
              홈으로
            </div>
          </button>
          <button onClick={handleResign} className="w-1/2">
            <div className="mt-6 font-bold h-10 rounded-zp-radius-btn bg-zp-sub-color flex justify-center items-center cursor-pointer">
              넘어가기
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
