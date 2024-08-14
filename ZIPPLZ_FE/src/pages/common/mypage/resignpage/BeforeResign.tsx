import { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function BeforeResign() {
  let user: string = '강신구';
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate(-1);
  };

  // 탈퇴하기 핸들러
  const handleResign = () => {
    localStorage.removeItem('token'); // JWT 토큰 제거
    navigate('/');
    setShowModal(true);
  };

  // 모달 확인 버튼 핸들러
  // 확인 버튼 누르면 홈 화면 이동
  // 로그아웃은 회원탈퇴 되면서 자동으로 됨
  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen p-6">
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

          <div className="p-4 bg-zp-light-beige rounded-zp-radius-big text-zp-xs font-bold">
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
        </div>

        {/* 탈퇴하기 버튼 */}
        <div
          className="mb-16 w-full h-12 rounded-zp-radius-btn bg-zp-sub-color flex justify-center items-center mt-auto cursor-pointer"
          onClick={handleResign}
        >
          <div className="text-zp-2xl font-bold">탈퇴하기</div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-zp-3xl font-bold mb-4">탈퇴 완료</h2>
            <p className="mt-12 text-zp-sm font-bold">
              ZIP-PlZ를 이용해주시고 사랑해주셔서 감사합니다.
              <br />
              더욱더 노력하고 발전하는 ZIP-PlZ가 되겠습니다.
            </p>
            <button
              className="w-full h-10 mt-12 font-bold text-zp-xs bg-zp-sub-color rounded-zp-radius-btn"
              onClick={handleConfirm}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
