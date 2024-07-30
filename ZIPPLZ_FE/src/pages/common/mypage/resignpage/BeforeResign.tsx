import { GoArrowLeft } from 'react-icons/go';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function BeforeResign() {
  let user = '강신구';
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // 탈퇴하기 핸들러
  const handleResign = () => {
    navigate('/resigncomplete');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl flex-grow">
          {/* 뒤로가기 버튼 */}
          <div className="flex items-center">
            <GoArrowLeft
              className="mr-6 cursor-pointer"
              onClick={handleGoBack}
              style={{ width: '27px', height: '20px' }} // 아이콘 크기 조정
            />
          </div>
          <div className="mt-6 w-[400px] h-24">
            <div className="text-zp-3xl font-bold">{user}님,</div>
            <div className="text-zp-3xl font-bold">
              탈퇴하기 전에 확인해주세요!
            </div>
          </div>

          <div className="p-4 bg-zp-light-gray rounded-zp-radius-big text-zp-xs font-bold">
            <div className="flex items-center space-x-2 text-zp-gray">
              <IoAlertCircleOutline />
              <div>주의사항</div>
            </div>
            <ul className="list-disc list-inside mt-2">
              <li>계정 삭제 후 30일간 다시 가입하실 수 없습니다.</li>
              <li>진행 중인 시공요청건이 있을 경우 탈퇴가 불가능합니다.</li>
              <li>탈퇴 후 모든 데이터가 삭제되고 복구하실 수 없습니다.</li>
            </ul>
          </div>

          <div>
            <ul className="mt-6 list-disc pl-6 text-zp-xl font-bold">
              <li className="mb-6">
                ZIP-PlZ에서 관리했던 000님의 모든 개인정보를 다시 볼 수 없어요!
              </li>
              <li className="mb-6">사업자등록증, 경력 인증서는 폐기돼요!</li>
            </ul>
          </div>
        </div>

        {/* 탈퇴하기 버튼 */}
        <div
          className="w-full h-[60px] rounded-zp-radius-btn bg-zp-sub-color flex justify-center items-center mt-auto cursor-pointer"
          onClick={handleResign}
        >
          <div className="text-zp-2xl font-bold">탈퇴하기</div>
        </div>
      </div>
    </>
  );
}
