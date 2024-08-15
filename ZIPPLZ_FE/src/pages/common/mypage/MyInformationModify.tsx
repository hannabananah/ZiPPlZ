import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { GoArrowLeft } from 'react-icons/go';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { useMyPageStore } from '@stores/myPageStore';

export default function MyInformationModify() {
  const navigate = useNavigate();

  // Zustand 상태 관리 사용
  const {
    role,
    nickname, // nickname 필드를 직접 가져옵니다.
    phoneNumber,
    address,
    fetchMyPageData,
    updateCustomerInfo,
    updateWorkerInfo,
  } = useMyPageStore();

  // 사용자가 고객인지 시공업자인지 상태를 API에서 가져온 role로 설정합니다.
  const userType = role === 'worker' ? 'worker' : 'customer';

  // 각 입력 필드의 상태를 관리합니다.
  const [localNickname, setLocalNickname] = useState(nickname || '');
  const [phone, setPhone] = useState(phoneNumber || '');
  const [userAddress, setUserAddress] = useState(address || '');
  const [businessNumber, setBusinessNumber] = useState('123-45-67890');
  const [locationDetails] = useState<string[]>([]);
  // setLocationDetails
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  // 오류 메시지 상태를 관리합니다.
  const [nicknameError, setNicknameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  // 컴포넌트가 마운트될 때 유저 데이터를 불러옵니다.
  useEffect(() => {
    fetchMyPageData(); // 유저 데이터를 불러오는 함수
  }, [fetchMyPageData]);

  // 유저 정보가 업데이트되면 입력 필드를 초기화합니다.
  useEffect(() => {
    setLocalNickname(nickname);
    setPhone(phoneNumber);
    setUserAddress(address);
  }, [nickname, phoneNumber, address]);

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/mypage');
  };

  // 수정완료 버튼 핸들러
  const handleSubmit = async () => {
    if (userType === 'customer' && !localNickname)
      setNicknameError('닉네임을 적어주세요');
    else setNicknameError('');

    if (!phone) setPhoneError('휴대폰 번호를 적어주세요');
    else setPhoneError('');

    if (userType === 'customer' && !userAddress)
      setAddressError('자택 주소를 적어주세요');
    else setAddressError('');

    if (
      (userType === 'customer' && localNickname && phone && userAddress) ||
      (userType === 'worker' && phone)
    ) {
      if (userType === 'customer') {
        // 고객 정보 업데이트
        await updateCustomerInfo(phone, localNickname, userAddress);
      } else if (userType === 'worker') {
        // 시공업자 정보 업데이트
        const locationList = locationDetails.map((location) => {
          const [city, district] = location.split(' ');
          return {
            sidoCode: 0,
            gugunCode: 0,
            localName: `${city} ${district}`,
          }; // 실제 코드로 변경 필요
        });
        await updateWorkerInfo(phone, locationList);
      }

      navigate('/mypage');
    }
  };

  // Daum Postcode Complete Handler
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? ', ' : '') + data.buildingName;
      }
      fullAddress += extraAddress !== '' ? `(${extraAddress})` : '';
    }

    setUserAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6">
        <div className="w-full">
          <div className="mt-12 h-12 flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                size={20}
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-xl font-bold text-center">
              내 정보 수정하기
            </div>
          </div>

          {userType === 'customer' && (
            <>
              <div className="mt-6 font-bold text-zp-xl text-zp-gray">
                닉네임
              </div>
              <div className="relative">
                <input
                  className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
                  placeholder="닉네임을 입력하세요"
                  value={localNickname}
                  onChange={(e) => setLocalNickname(e.target.value)}
                />
                <IoIosCloseCircleOutline
                  className="absolute right-4 top-8 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setLocalNickname('')}
                  style={{ width: '24px', height: '24px' }}
                />
                {nicknameError && (
                  <div className="text-zp-red font-bold text-zp-xs mt-1">
                    {nicknameError}
                  </div>
                )}
              </div>

              <div className="mt-6 font-bold text-zp-xl text-zp-gray">
                자택 주소
              </div>
              <div className="relative">
                <input
                  className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
                  placeholder="자택 주소를 입력하세요"
                  value={userAddress}
                  onClick={() => setIsPostcodeOpen(true)}
                  readOnly
                />
                <IoIosCloseCircleOutline
                  className="absolute right-4 top-8 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setUserAddress('')}
                  style={{ width: '24px', height: '24px' }}
                />
                {addressError && (
                  <div className="text-zp-red font-bold text-zp-xs mt-1">
                    {addressError}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="mt-6 font-bold text-zp-xl text-zp-gray">
            휴대폰 번호
          </div>
          <div className="relative">
            <input
              className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-8 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPhone('')}
              style={{ width: '24px', height: '24px' }}
            />
            {phoneError && (
              <div className="text-zp-red font-bold text-zp-xs mt-1">
                {phoneError}
              </div>
            )}
          </div>

          {userType === 'worker' && (
            <>
              <div className="mt-6 font-bold text-zp-xl text-zp-gray">
                활동 지역
              </div>
              <div className="relative">
                <input
                  className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
                  placeholder="활동 지역을 입력하세요"
                  value={locationDetails.join(', ')} // 여러 개의 활동 지역을 콤마로 구분하여 표시
                  readOnly
                />
              </div>

              <div
                className="mt-6 w-full h-10 text-zp-xl font-bold bg-zp-sub-color rounded-zp-radius-btn flex justify-center items-center cursor-pointer"
                onClick={() => navigate('/mypage/workerinfolocationdetail')}
              >
                활동 지역 선택
              </div>

              <div className="mt-6 font-bold text-zp-xl text-zp-gray">
                사업자 등록 번호
              </div>
              <div className="relative">
                <input
                  className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
                  placeholder="123-45-67890"
                  value={businessNumber}
                  onChange={(e) => setBusinessNumber(e.target.value)}
                />
                <IoIosCloseCircleOutline
                  className="absolute right-4 top-8 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setBusinessNumber('')}
                  style={{ width: '24px', height: '24px' }}
                />
              </div>
            </>
          )}

          {isPostcodeOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-zp-white p-4 rounded-zp-radius-btn shadow-lg">
                <DaumPostcode onComplete={handleComplete} />
                <button
                  className="mt-2 w-full bg-zp-sub-color rounded-zp-radius-btn font-bold text-white p-2 rounded-md"
                  onClick={() => setIsPostcodeOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}

          <div
            className="mt-6 w-full h-10 text-zp-xl font-bold bg-zp-sub-color rounded-zp-radius-btn flex justify-center items-center cursor-pointer"
            onClick={handleSubmit}
          >
            수정완료
          </div>
        </div>
      </div>
    </>
  );
}
