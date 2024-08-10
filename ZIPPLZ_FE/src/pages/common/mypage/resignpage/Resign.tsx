import { GoArrowLeft } from 'react-icons/go';
import { HiChevronRight } from 'react-icons/hi2';
import { PiWarningCircleBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

export default function Resign() {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // 더 이상 ZIP-PlZ를 사용하지 않아요 페이지로 이동
  const handleNavigateToDontUseZIPPLZ = () => {
    navigate('/mypage/dontusezipplz');
  };

  // // 개인정보가 불안해요 페이지 삭제 예정
  // const handleNavigateToInformationNerve = () => {
  //   navigate('/Resign');
  // };

  // 비매너 시공업자를 만났어요 페이지로 이동
  const handleNavigateToRoughWorker = () => {
    navigate('/mypage/roughworker');
  };

  // 기타 페이지 보류
  // const handleNavigateToEtc = () => {
  //   navigate('/Etc');
  // };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full">
          {/* 뒤로가기 버튼 + "마이페이지" 글자 */}
          <div className="flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                size={20} // 아이콘 크기 조정
              />
            </div>
            <div className="">건너뛰기</div>
          </div>
          <div className="mt-6 text-zp-xl font-bold">
            회원 탈퇴 전 주의사항을 확인해주세요
          </div>

          <div className="mt-6 bg-zp-light-beige rounded-zp-radius-big">
            <div className="flex items-center">
              <div className="text-zp-gray">
                <PiWarningCircleBold />
              </div>
              <div className="pl-1 text-zp-sm font-bold text-zp-gray">
                주의사항
              </div>
            </div>

            <ul className="text-zp-sm mt-2 list-disc pl-5">
              <li>계정 삭제 후 30일간 다시 가입하실 수 없습니다.</li>
              <li>진행 중인 시공요청건이 있을 경우 탈퇴가 불가능합니다.</li>
              <li>탈퇴 후 모든 데이터가 삭제되고 복구하실 수 없습니다.</li>
            </ul>
          </div>

          <div className="mt-6 text-zp-xl font-bold">
            회원을 탈퇴하고자 하는 이유를 알려주세요
          </div>
          {/* 1. 더 이상 ZIP-PlZ를 사용하지 않아요 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-xs">더 이상 ZIP-PlZ를 사용하지 않아요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToDontUseZIPPLZ}
              />
            </div>
          </div>
          {/* 2. 개인정보가 불안해요 페이지 삭제 예정 */}
          {/* <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-xs">개인정보가 불안해요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div> */}
          {/* 3. 비매너 시공업자를 만났어요 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-xs">비매너 시공업자를 만났어요</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToRoughWorker}
              />
            </div>
          </div>
          {/* 4. 기타 페이지 보류*/}
          {/* <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-xs">기타</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToEtc}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
