import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { GoArrowLeft } from 'react-icons/go';
import { HiChevronRight } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // 내 정보 수정하기 페이지로 이동
  const handleNavigateToMyInformationModify = () => {
    navigate('/mypage/myinformationmodify'); // '/version' 경로로 이동
  };

  // 비밀번호 변경 페이지로 이동
  const handleNavigateToMyPasswordModify = () => {
    navigate('/mypage/mypasswordmodify'); // '/version' 경로로 이동
  };

  // 내가 쓴 글 / 스크랩 글 목록 페이지로 이동
  const handleNavigateToMyBoardAndScrapList = () => {
    navigate('/mypage/myboardlist'); // '/version' 경로로 이동
  };

  // 관심있는 시공업자 / 찜한 자재 목록 페이지로 이동
  const handleNavigateToWishWorkerList = () => {
    navigate('/mypage/wishworkerlist'); // '/version' 경로로 이동
  };

  // 이용약관 / 개인정보처리방침 페이지로 이동
  const handleNavigateToPolicy = () => {
    navigate('/mypage/policy'); // '/version' 경로로 이동
  };

  // 버전 페이지로 이동
  const handleNavigateToVersion = () => {
    navigate('/mypage/version'); // '/version' 경로로 이동
  };

  // 로그아웃 모달 열기
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // 로그아웃 모달 닫기
  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  // 실제 로그아웃 처리 (로그아웃 구현 후 적용 예정)
  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // 로그아웃 로직 추가 필요
    // 임시로 홈으로 이동하게 해놓음
    navigate('/');
  };

  // 탈퇴하기 페이지로 이동
  const handleNavigateToResign = () => {
    navigate('/mypage/resign'); // '/version' 경로로 이동
  };

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
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-3xl font-bold text-center">
              마이페이지
            </div>
          </div>

          {/* 프로필 사진, 닉네임 */}
          <div className="flex justify-center w-full mt-4">
            <div className="flex flex-col items-center">
              <div className="w-36 h-36">
                <CgProfile size={144} />
              </div>
              <div className="w-36 h-8 grid place-items-center text-zp-lg">
                강신구
              </div>
            </div>
          </div>

          <hr className="mt-6 w-full border-zp-light-gray" />

          {/* 1. 내 정보 수정하기 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">내 정보 수정하기</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToMyInformationModify}
              />
            </div>
          </div>

          {/* 2. 비밀번호 변경 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full ">
            <div className="text-zp-lg">비밀번호 변경</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToMyPasswordModify}
              />
            </div>
          </div>

          {/* 3. 내가 쓴 글 / 스크랩 글 목록 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full ">
            <div className="text-zp-lg">내가 쓴 글 / 스크랩 글 목록</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToMyBoardAndScrapList}
              />
            </div>
          </div>

          {/* 4. 관심있는 시공업자 / 찜한 자재 목록 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">관심있는 시공업자 / 찜한 자재 목록</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToWishWorkerList}
              />
            </div>
          </div>

          <hr className="mt-6 w-full border-zp-light-gray" />

          {/* 5. 이용약관 / 개인정보처리방침 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">이용약관 / 개인정보처리방침</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToPolicy}
              />
            </div>
          </div>

          {/* 6. 버전 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">버전</div>
            <div className="flex align-middle">
              <div className="px-2">1.1.0</div>
              <HiChevronRight
                className="cursor-pointer relative top-1"
                onClick={handleNavigateToVersion}
              />
            </div>
          </div>

          {/* 7. 로그아웃 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">로그아웃</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleLogoutClick}
              />
            </div>
          </div>

          {/* 8. 탈퇴하기 + 해당 페이지 이동 아이콘 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">탈퇴하기</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToResign}
              />
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50">
          <div className="px-8 h-[250px] bg-zp-white rounded-zp-radius-big p-6">
            <h2 className="p-6 text-zp-3xl font-bold flex justify-center">
              로그아웃
            </h2>
            <p className="p-6 text-zp-xl font-bold flex justify-center">
              정말 로그아웃을 하시겠습니까?
            </p>
            <div className="mt-2 flex font-bold justify-center space-x-2">
              <button
                className="w-full px-4 py-2 rounded-zp-radius-big bg-zp-light-beige text-zp-xs "
                onClick={handleCloseModal}
              >
                취소
              </button>
              <button
                className="w-full px-4 py-2 rounded-zp-radius-big bg-zp-sub-color text-zp-xs"
                onClick={handleLogoutConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
