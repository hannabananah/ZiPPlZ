import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { GoArrowLeft } from 'react-icons/go';
import { HiChevronRight } from 'react-icons/hi2';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { TbDog } from 'react-icons/tb';
import { IoLogoOctocat } from 'react-icons/io';
import { GiMonkey } from 'react-icons/gi';
import { SiFoodpanda } from 'react-icons/si';
import { FaHouseUser } from 'react-icons/fa';
import { PiRabbit } from 'react-icons/pi';
import { PiCow } from 'react-icons/pi';
import { RiBearSmileLine } from 'react-icons/ri';
import { PiHorse } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  nickname: string;
  fullname: string;
}

const icons = [
  TbDog,
  IoLogoOctocat,
  GiMonkey,
  SiFoodpanda,
  FaHouseUser,
  PiRabbit,
  PiCow,
  RiBearSmileLine,
  PiHorse,
];

export default function MyPage() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'worker'>('customer');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    fullname: '',
  });
  const [profileImage, setProfileImage] = useState<string | JSX.Element | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<JSX.Element | null>(null);

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // 내 정보 수정하기 페이지로 이동
  const handleNavigateToMyInformationModify = () => {
    navigate('/mypage/myinformationmodify');
  };

  // 비밀번호 변경 페이지로 이동
  const handleNavigateToMyPasswordModify = () => {
    navigate('/mypage/mypasswordmodify');
  };

  // 내가 쓴 글 / 스크랩 글 목록 페이지로 이동
  const handleNavigateToMyBoardAndScrapList = () => {
    navigate('/mypage/myboardlist');
  };

  // 관심있는 시공업자 / 찜한 자재 목록 페이지로 이동
  const handleNavigateToWishWorkerList = () => {
    navigate('/mypage/wishworkerlist');
  };

  // 이용약관 / 개인정보처리방침 페이지로 이동
  const handleNavigateToPolicy = () => {
    navigate('/mypage/policy');
  };

  // 버전 페이지로 이동
  const handleNavigateToVersion = () => {
    navigate('/mypage/version');
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
    navigate('/mypage/resign');
  };

  // 프로필 이미지 변경 모달 열기
  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
  };

  // 프로필 이미지 변경 모달 닫기
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  // 사용자 정보 가져오기 (실제 구현에서는 API 호출 등을 통해 가져오게 됨)
  useEffect(() => {
    // 예시 데이터를 설정합니다. 실제로는 API 호출 등을 통해 데이터를 가져옵니다.
    setUserType('customer'); // 'customer' 또는 'worker'
    setUserInfo({ nickname: '강신구', fullname: '김현태' });
  }, []);

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setSelectedIcon(null);
        handleCloseProfileModal();
      };
      reader.readAsDataURL(file);
    }
  };

  // 아이콘 선택 핸들러
  const handleIconSelect = (icon: JSX.Element) => {
    setProfileImage(null);
    setSelectedIcon(icon);
    handleCloseProfileModal();
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
                size={20}
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-3xl font-bold text-center">
              마이페이지
            </div>
          </div>

          {/* 프로필 사진, 닉네임 또는 본명 */}
          <div className="flex justify-center w-full mt-4 relative">
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 relative">
                {profileImage ? (
                  <div
                    className="w-full h-full rounded-zp-radius-full overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                ) : selectedIcon ? (
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                    {React.cloneElement(selectedIcon, { size: 100 })}
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <CgProfile size={144} />
                  </div>
                )}
                <div
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer"
                  onClick={handleOpenProfileModal}
                >
                  <AiOutlinePlus size={24} />
                </div>
              </div>
              <div className="w-36 h-8 grid place-items-center text-zp-lg">
                {userType === 'customer'
                  ? userInfo.nickname
                  : userInfo.fullname}
              </div>
            </div>
          </div>

          <hr className="mt-6 w-full border-zp-light-gray" />

          {/* 내 정보 수정하기 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">내 정보 수정하기</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToMyInformationModify}
              />
            </div>
          </div>

          {/* 비밀번호 변경 */}
          <div className="mt-6 flex items-center justify-between w-full ">
            <div className="text-zp-lg">비밀번호 변경</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToMyPasswordModify}
              />
            </div>
          </div>

          {/* 내가 쓴 글 / 스크랩 글 목록 */}
          <div className="mt-6 flex items-center justify-between w-full ">
            <div className="text-zp-lg">내가 쓴 글 / 스크랩 글 목록</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToMyBoardAndScrapList}
              />
            </div>
          </div>

          {/* 관심있는 시공업자 / 찜한 자재 목록 */}
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

          {/* 이용약관 / 개인정보처리방침 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">이용약관 / 개인정보처리방침</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleNavigateToPolicy}
              />
            </div>
          </div>

          {/* 버전 */}
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

          {/* 로그아웃 */}
          <div className="mt-6 flex items-center justify-between w-full">
            <div className="text-zp-lg">로그아웃</div>
            <div>
              <HiChevronRight
                className="cursor-pointer"
                onClick={handleLogoutClick}
              />
            </div>
          </div>

          {/* 탈퇴하기 */}
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

      {/* 로그아웃 모달 */}
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

      {/* 프로필 이미지 변경 모달 */}
      {showProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50">
          <div className="bg-zp-sub-color rounded-zp-radius-big p-6 w-80">
            <h2 className="text-zp-2xl font-bold flex justify-center mb-4">
              프로필 이미지 선택
            </h2>
            <div className="flex justify-center mb-4">
              <CgProfile size={72} />
            </div>
            <div className="grid grid-cols-5 gap-2">
              <label className="flex items-center justify-center rounded-full w-12 h-12 cursor-pointer">
                <MdOutlinePhotoCamera size={24} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {icons.map((IconComponent, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center"
                  onClick={() => handleIconSelect(<IconComponent size={24} />)}
                >
                  <IconComponent size={24} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
