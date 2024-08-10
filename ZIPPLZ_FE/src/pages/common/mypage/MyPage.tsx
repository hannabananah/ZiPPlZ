import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaHouseUser } from 'react-icons/fa';
import { GiMonkey } from 'react-icons/gi';
import { GoArrowLeft } from 'react-icons/go';
import { HiChevronRight } from 'react-icons/hi2';
import { IoLogoOctocat } from 'react-icons/io';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { PiRabbit } from 'react-icons/pi';
import { PiCow } from 'react-icons/pi';
import { PiHorse } from 'react-icons/pi';
import { RiBearSmileLine } from 'react-icons/ri';
import { SiFoodpanda } from 'react-icons/si';
import { TbDog } from 'react-icons/tb';
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
  const [profileImage, setProfileImage] = useState<string | JSX.Element | null>(
    null
  );
  const [selectedIcon, setSelectedIcon] = useState<JSX.Element | null>(null);
  const [tempProfileImage, setTempProfileImage] = useState<string | null>(null);
  const [tempSelectedIcon, setTempSelectedIcon] = useState<JSX.Element | null>(
    null
  );

  const handleGoBack = () => {
    navigate('-1');
  };

  const handleNavigateToMyInformationModify = () => {
    navigate('/mypage/myinformationmodify');
  };

  const handleNavigateToMyPasswordModify = () => {
    navigate('/mypage/mypasswordmodify');
  };

  const handleNavigateToMyFindWorkerList = () => {
    navigate('/mypage/MyFindWorkerList');
  };

  const handleNavigateToMyFindWorkerScrapList = () => {
    navigate('/mypage/MyFindWorkerScrapList');
  };

  const handleNavigateToWishWorkerList = () => {
    navigate('/mypage/wishworkerlist');
  };

  const handleNavigateToPolicy = () => {
    navigate('/mypage/policy');
  };

  const handleNavigateToVersion = () => {
    navigate('/mypage/version');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleNavigateToResign = () => {
    if (userType === 'customer') {
      navigate('/mypage/resign');
    } else if (userType === 'worker') {
      navigate('/mypage/BeforeResign');
    }
  };

  const handleOpenProfileModal = () => {
    setTempProfileImage(profileImage as string);
    setTempSelectedIcon(selectedIcon);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  useEffect(() => {
    setUserType('customer');
    setUserInfo({ nickname: '강신구', fullname: '김현태' });
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileImage(reader.result as string);
        setTempSelectedIcon(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconSelect = (icon: JSX.Element) => {
    setTempProfileImage(null);
    setTempSelectedIcon(icon);
  };

  const handleSaveProfile = () => {
    setProfileImage(tempProfileImage);
    setSelectedIcon(tempSelectedIcon);
    setShowProfileModal(false);
  };

  const handleClearProfile = () => {
    setTempProfileImage(null);
    setTempSelectedIcon(null);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6">
      <div className="w-full">
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

        <div className="flex justify-center w-full mt-4 relative">
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 relative">
              {profileImage && typeof profileImage === 'string' ? (
                <div className="w-full h-full rounded-zp-radius-full overflow-hidden flex items-center justify-center">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-zp-radius-full"
                  />
                </div>
              ) : selectedIcon ? (
                <div className="w-full h-full rounded-zp-radius-full overflow-hidden flex items-center justify-center bg-zp-white">
                  {React.cloneElement(selectedIcon, { size: 100 })}
                </div>
              ) : (
                <div className="w-full h-full rounded-zp-radius-full overflow-hidden bg-zp-white flex items-center justify-center">
                  <CgProfile size={144} />
                </div>
              )}
              <div
                className="absolute bottom-0 right-0 bg-zp-white rounded-zp-radius-full p-1 cursor-pointer"
                onClick={handleOpenProfileModal}
              >
                <MdOutlinePhotoCamera size={24} />
              </div>
            </div>
            <div className="w-36 h-8 grid place-items-center text-zp-lg font-bold">
              {userType === 'customer' ? userInfo.nickname : userInfo.fullname}
            </div>
          </div>
        </div>

        <hr className="mt-6 w-full border-zp-light-gray" />

        <div className="mt-6 flex items-center justify-between w-full">
          <div className="text-zp-lg">내 정보 수정하기</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyInformationModify}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between w-full ">
          <div className="text-zp-lg">비밀번호 변경</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyPasswordModify}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between w-full ">
          <div className="text-zp-lg">내가 쓴 글 목록</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyFindWorkerList}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between w-full ">
          <div className="text-zp-lg">스크랩 글 목록</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyFindWorkerScrapList}
            />
          </div>
        </div>

        {userType === 'customer' && (
          <>
            <div className="mt-6 flex items-center justify-between w-full">
              <div className="text-zp-lg">
                관심있는 시공업자 / 찜한 자재 목록
              </div>
              <div>
                <HiChevronRight
                  className="cursor-pointer"
                  onClick={handleNavigateToWishWorkerList}
                />
              </div>
            </div>
          </>
        )}

        <hr className="mt-6 w-full border-zp-light-gray" />

        <div className="mt-6 flex items-center justify-between w-full">
          <div className="text-zp-lg">이용약관 / 개인정보처리방침</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToPolicy}
            />
          </div>
        </div>

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

        <div className="mt-6 flex items-center justify-between w-full">
          <div className="text-zp-lg">로그아웃</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleLogoutClick}
            />
          </div>
        </div>

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

      {showLogoutModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div
            className="px-8 h-[250px] bg-zp-white rounded-zp-radius-big p-6"
            onClick={(e) => e.stopPropagation()}
          >
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

      {showProfileModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-zp-black bg-opacity-50 z-50"
          onClick={handleCloseProfileModal}
        >
          <div
            className="bg-zp-sub-color rounded-zp-radius-big p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-zp-2xl font-bold flex justify-center mb-4">
              프로필 이미지 선택
            </h2>
            <div className="flex justify-center mb-4">
              {tempProfileImage ? (
                <div className="w-24 h-24 rounded-zp-radius-full overflow-hidden flex items-center justify-center bg-zp-white">
                  <img
                    src={
                      typeof tempProfileImage === 'string'
                        ? tempProfileImage
                        : undefined
                    }
                    alt="Profile"
                    className="w-full h-full object-cover rounded-zp-radius-full"
                  />
                </div>
              ) : tempSelectedIcon ? (
                <div className="w-24 h-24 rounded-zp-radius-full overflow-hidden flex items-center justify-center bg-zp-white">
                  {React.cloneElement(tempSelectedIcon, { size: 80 })}
                </div>
              ) : (
                <CgProfile size={96} />
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              <label className="bg-zp-white rounded-zp-radius-full flex items-center justify-center rounded-full w-12 h-12 cursor-pointer">
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
                  className="w-12 h-12 bg-zp-white rounded-zp-radius-full  cursor-pointer flex items-center justify-center"
                  onClick={() => handleIconSelect(<IconComponent size={24} />)}
                >
                  <IconComponent size={24} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              <button
                className="w-full h-10 bg-zp-main-color rounded-zp-radius-big font-bold"
                onClick={handleClearProfile}
              >
                지우기
              </button>
              <button
                className="w-full h-10 bg-zp-main-color rounded-zp-radius-big font-bold"
                onClick={handleSaveProfile}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
