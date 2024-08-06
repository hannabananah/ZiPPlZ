import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

export default function Version() {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/mypage');
  };
  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          {/* 뒤로가기 버튼 + "버전" text */}
          <div className="mt-10 h-12 flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                size={20} // 아이콘 크기 조정
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-2xl font-bold text-center">
              버전
            </div>
          </div>

          <div className="mt-12 text-zp-xs text-zp-gray font-bold">버전</div>

          <div className="mt-2 w-full text-zp-xs bg-zp-sub-color rounded-zp-radius-big">
            <div className="p-6">
              <div className="font-bold">V 1.1.0</div>
              <div className="mt-2">
                이 업데이트는 중요한 버그 수정을 포함하며, 드물게 데이터베이스
                오염 문제가 발생한 사진이 사진 보관함에서 삭제된 후 다시 표시될
                수 있는 문제를 해결합니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
