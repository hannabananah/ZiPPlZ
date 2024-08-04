import { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function MyInformationModify() {
  const navigate = useNavigate();

  // 각 입력 필드의 상태를 관리합니다.
  const [nickname, setNickname] = useState('백승범123');
  const [phoneNumber, setPhoneNumber] = useState('010-1234-5678');
  const [address, setAddress] = useState('서울시 강남구 테헤란로');

  // 오류 메시지 상태를 관리합니다.
  const [nicknameError, setNicknameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [addressError, setAddressError] = useState('');

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // 입력 필드 초기화 핸들러
  const handleClear = (setter) => {
    setter('');
  };

  // 수정완료 버튼 핸들러
  const handleSubmit = () => {
    // 각 입력 필드의 값이 비어 있는지 확인하고, 비어 있으면 오류 메시지 설정
    if (!nickname) setNicknameError('닉네임을 적어주세요');
    else setNicknameError('');

    if (!phoneNumber) setPhoneNumberError('휴대폰 번호를 적어주세요');
    else setPhoneNumberError('');

    if (!address) setAddressError('집 주소를 적어주세요');
    else setAddressError('');

    // 모든 필드가 채워져 있으면 제출 로직 수행
    if (nickname && phoneNumber && address) {
      console.log('수정완료');
      // 추가적인 제출 로직을 여기에 작성
    }
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* 뒤로가기 버튼 + "내 정보 수정하기" 글자 */}
          <div className="h-12 flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                style={{ width: '27px', height: '20px' }} // 아이콘 크기 조정
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-3xl font-bold text-center">
              내 정보 수정하기
            </div>
          </div>

          {/* 닉네임 */}
          <div className="mt-6 h-10 font-bold text-zp-lg text-zp-gray">닉네임</div>
          <div className="relative">
            <input
              className="w-full h-[60px] px-4 text-zp-lg text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="백승범123"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => handleClear(setNickname)}
              style={{ width: '24px', height: '24px' }} // 아이콘 크기 조정
            />
            {nicknameError && (
              <div className="text-zp-red font-bold text-zp-xs mt-1">{nicknameError}</div>
            )}
          </div>
          <ul className="mt-2 list-disc pl-6 text-zp-2xs">
            <li>
              일부 특수문자 사용 불가 (&, &lt;, &gt;, (, ), ‘, /, “, 콤마),
              이모티콘 사용 불가
            </li>
            <li>최대 8자 이내</li>
            <li>띄어쓰기 불가능</li>
          </ul>

          {/* 휴대폰 번호 */}
          <div className="mt-6 h-10 font-bold text-zp-lg text-zp-gray">휴대폰 번호</div>
          <div className="relative">
            <input
              className="w-full h-[60px] px-4 text-zp-lg text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="010-1234-5678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => handleClear(setPhoneNumber)}
              style={{ width: '24px', height: '24px' }}
            />
            {phoneNumberError && (
              <div className="text-zp-red font-bold text-zp-xs mt-1">{phoneNumberError}</div>
            )}
          </div>

          {/* 집 주소 */}
          <div className="mt-6 h-10 font-bold text-zp-lg text-zp-gray">집 주소</div>
          <div className="relative">
            <input
              className="w-full h-[60px] px-4 text-zp-lg text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="집 주소 api"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => handleClear(setAddress)}
              style={{ width: '24px', height: '24px' }}
            />
            {addressError && (
              <div className="text-zp-red font-bold text-zp-xs mt-1">{addressError}</div>
            )}
          </div>

          <div
            className="mt-6 w-full h-[60px] text-zp-2xl bg-zp-sub-color rounded-zp-radius-btn flex justify-center items-center cursor-pointer"
            onClick={handleSubmit}
          >
            수정완료
          </div>
        </div>
      </div>
    </>
  );
}
