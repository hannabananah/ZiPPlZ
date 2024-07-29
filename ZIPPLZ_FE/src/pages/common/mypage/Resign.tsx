import { GoArrowLeft } from 'react-icons/go';
import { HiChevronRight } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function Resign() {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // 탈퇴하기 페이지로 이동
  const handleNavigateToResign = () => {
    navigate('/Resign'); // '/version' 경로로 이동
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* 뒤로가기 버튼 + "마이페이지" 글자 */}
          <div className="flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                style={{ width: '27px', height: '20px' }} // 아이콘 크기 조정
              />
            </div>
            <div className="">건너뛰기</div>
          </div>

          <div>탈퇴하는 이유가 무엇인가요?</div>

          {/* 1. 더 이상 ZIP-PlZ를 사용하지 않아요 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full mt-4">
            <div className="text-zp-lg">더 이상 ZIP-PlZ를 사용하지 않아요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div>

          {/* 2. 개인정보가 불안해요 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full mt-4">
            <div className="text-zp-lg">개인정보가 불안해요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div>

          {/* 3. 오류가 생겨서 쓸 수 없어요 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full mt-4">
            <div className="text-zp-lg">오류가 생겨서 쓸 수 없어요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div>

          {/* 4. 사용법을 모르겠어요 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full mt-4">
            <div className="text-zp-lg">사용법을 모르겠어요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div>

          {/* 5. 비매너 시공업자를 만났어요 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full mt-4">
            <div className="text-zp-lg">비매너 시공업자를 만났어요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div>

          {/* 6. 기타 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full mt-4">
            <div className="text-zp-lg">기타</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
