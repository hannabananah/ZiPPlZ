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

import { useLoginUserStore } from '@/stores/loginUserStore';
import { useMyPageStore } from '@stores/myPageStore';

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

  const {
    profileImg,
    name,
    role,
    fetchMyPageData,
    uploadProfileImage,
    deleteProfileImage,
  } = useMyPageStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null); // 이미지 미리보기용 상태
  const [selectedIcon, setSelectedIcon] = useState<JSX.Element | null>(null); // 아이콘 선택 상태
  const { setLoginUser } = useLoginUserStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/member/login'); // 토큰이 없으면 로그인 페이지로 이동
    } else {
      fetchMyPageData(); // 컴포넌트가 마운트될 때 마이페이지 데이터 가져오기
    }
  }, [fetchMyPageData, navigate]);

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
    navigate('/mypage/myfindworkerscraplist');
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

  // 로그아웃: localstorage에서 해당 유저 토큰 제거 후 로그인 페이지로 이동
  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login-user');
    setLoginUser(null);
    setShowLogoutModal(false);
    navigate('/member/login');
  };

  const handleNavigateToResign = () => {
    navigate('/mypage/resign');
  };

  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
        setSelectedIcon(null); // 이미지 파일이 선택되면 아이콘 선택을 초기화
      };
      reader.readAsDataURL(file);
    }
  };

  const convertIconToBlob = async (IconComponent: JSX.Element) => {
    // ReactDOMServer를 이용하여 IconComponent를 문자열로 변환
    const svgString = new XMLSerializer().serializeToString(
      new DOMParser().parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg">${IconComponent.props.children}</svg>`,
        'image/svg+xml'
      ).documentElement
    );

    // 변환된 SVG 문자열을 Blob으로 변환
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    return blob;
  };

  const handleSaveProfile = async () => {
    if (selectedFile) {
      await uploadProfileImage(selectedFile);
      await fetchMyPageData(); // 프로필 이미지 업데이트 후 다시 불러오기
      setPreviewImg(null); // 미리보기 이미지 초기화
    } else if (selectedIcon) {
      const iconBlob = await convertIconToBlob(selectedIcon);
      await uploadProfileImage(iconBlob); // 아이콘을 이미지로 변환하여 저장
      await fetchMyPageData();
    }
    setShowProfileModal(false);
  };

  const handleClearProfile = async () => {
    await deleteProfileImage(); // 프로필 이미지를 삭제
    setPreviewImg(null); // 미리보기 이미지 초기화
    setSelectedIcon(null); // 아이콘 선택 초기화
  };

  const handleIconSelect = (IconComponent: JSX.Element) => {
    setSelectedIcon(IconComponent);
    setPreviewImg(null); // 아이콘을 선택하면 미리보기 이미지 초기화
    setSelectedFile(null); // 아이콘을 선택하면 이미지 파일 선택을 초기화
  };

  return (
    <div className="flex items-start justify-center min-h-screen p-6">
      <div className="w-full">
        <div className="relative flex items-center justify-between w-full">
          <div className="flex items-center">
            <GoArrowLeft
              className="mr-6 cursor-pointer"
              onClick={handleGoBack}
              size={20}
            />
          </div>
          <div className="absolute font-bold text-center transform -translate-x-1/2 left-1/2 text-zp-3xl">
            마이페이지
          </div>
        </div>

        <div className="relative flex justify-center w-full mt-4">
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36">
              {previewImg ? (
                <div className="flex items-center justify-center w-full h-full overflow-hidden rounded-zp-radius-full">
                  <img
                    src={previewImg}
                    alt="Profile"
                    className="object-cover w-full h-full rounded-zp-radius-full"
                  />
                </div>
              ) : selectedIcon ? (
                <div className="flex items-center justify-center w-full h-full overflow-hidden rounded-zp-radius-full">
                  {selectedIcon}
                </div>
              ) : profileImg ? (
                <div className="w-full h-full rounded-zp-radius-full overflow-hidden flex items-center justify=center">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="object-cover w-full h-full rounded-zp-radius-full"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full overflow-hidden rounded-zp-radius-full bg-zp-white">
                  <CgProfile size={144} />
                </div>
              )}
              <div
                className="absolute bottom-0 right-0 p-1 cursor-pointer bg-zp-white rounded-zp-radius-full"
                onClick={handleOpenProfileModal}
              >
                <MdOutlinePhotoCamera size={24} />
              </div>
            </div>
            {/* 임시로 고객, 시공업자 둘다 이름 */}
            <div className="grid h-8 font-bold w-36 place-items-center text-zp-lg">
              {name}
            </div>
          </div>
        </div>

        <hr className="w-full mt-6 border-zp-light-gray" />

        <div className="flex items-center justify-between w-full mt-6">
          <div className="text-zp-lg">내 정보 수정하기</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyInformationModify}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-6 ">
          <div className="text-zp-lg">비밀번호 변경</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyPasswordModify}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-6 ">
          <div className="text-zp-lg">내가 쓴 글 목록</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyFindWorkerList}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-6 ">
          <div className="text-zp-lg">스크랩 글 목록</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToMyFindWorkerScrapList}
            />
          </div>
        </div>

        {role === 'customer' && (
          <>
            <div className="flex items-center justify-between w-full mt-6">
              <div className="text-zp-lg">관심있는 시공업자 목록</div>
              <div>
                <HiChevronRight
                  className="cursor-pointer"
                  onClick={handleNavigateToWishWorkerList}
                />
              </div>
            </div>
          </>
        )}

        <hr className="w-full mt-6 border-zp-light-gray" />

        <div className="flex items-center justify-between w-full mt-6">
          <div className="text-zp-lg">이용약관 / 개인정보처리방침</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleNavigateToPolicy}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-6">
          <div className="text-zp-lg">버전</div>
          <div className="flex align-middle">
            <div className="px-2">1.1.0</div>
            <HiChevronRight
              className="relative cursor-pointer top-1"
              onClick={handleNavigateToVersion}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-6">
          <div className="text-zp-lg">로그아웃</div>
          <div>
            <HiChevronRight
              className="cursor-pointer"
              onClick={handleLogoutClick}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-6">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-zp-black"
          onClick={handleCloseModal}
        >
          <div
            className="px-8 h-[250px] bg-zp-white rounded-zp-radius-big p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="flex justify-center p-6 font-bold text-zp-3xl">
              로그아웃
            </h2>
            <p className="flex justify-center p-6 font-bold text-zp-xl">
              정말 로그아웃을 하시겠습니까?
            </p>
            <div className="flex justify-center mt-2 space-x-2 font-bold">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-zp-black"
          onClick={handleCloseProfileModal}
        >
          <div
            className="p-6 bg-zp-sub-color rounded-zp-radius-big w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="flex justify-center mb-4 font-bold text-zp-2xl">
              프로필 이미지 선택
            </h2>
            {previewImg || selectedIcon ? (
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 overflow-hidden rounded-zp-radius-full">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="Selected Profile"
                    className="object-cover w-full h-full"
                  />
                ) : selectedIcon ? (
                  selectedIcon
                ) : null}
              </div>
            ) : null}
            <div className="flex justify-center mb-4">
              <div className="grid grid-cols-5 gap-2">
                <label className="flex items-center justify-center w-12 h-12 rounded-full cursor-pointer bg-zp-white rounded-zp-radius-full">
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
                    className="flex items-center justify-center w-12 h-12 cursor-pointer bg-zp-white rounded-zp-radius-full"
                    onClick={() =>
                      handleIconSelect(<IconComponent size={24} />)
                    }
                  >
                    <IconComponent size={24} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              <button
                className="w-full h-10 font-bold bg-zp-main-color rounded-zp-radius-big"
                onClick={handleClearProfile}
              >
                지우기
              </button>
              <button
                className="w-full h-10 font-bold bg-zp-main-color rounded-zp-radius-big"
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
