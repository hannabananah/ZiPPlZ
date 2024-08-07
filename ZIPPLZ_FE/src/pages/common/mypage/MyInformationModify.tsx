import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { GoArrowLeft } from 'react-icons/go';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function MyInformationModify() {
  const navigate = useNavigate();

  // 각 입력 필드의 상태를 관리합니다.
  const [nickname, setNickname] = useState('백승범123');
  const [phoneNumber, setPhoneNumber] = useState('010-1234-5678');
  const [address, setAddress] = useState('서울시 강남구 테헤란로');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  // 오류 메시지 상태를 관리합니다.
  const [nicknameError, setNicknameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [addressError, setAddressError] = useState('');

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/mypage');
  };

  // 수정완료 버튼 핸들러
  const handleSubmit = () => {
    // 각 입력 필드의 값이 비어 있는지 확인하고, 비어 있으면 오류 메시지 설정
    if (!nickname) setNicknameError('닉네임을 적어주세요');
    else setNicknameError('');

    if (!phoneNumber) setPhoneNumberError('휴대폰 번호를 적어주세요');
    else setPhoneNumberError('');

    if (!address) setAddressError('자택 주소를 적어주세요');
    else setAddressError('');

    // 모든 필드가 채워져 있으면 제출 로직 수행
    if (nickname && phoneNumber && address) {
      // console.log('수정완료');
      navigate('/mypage');
      // 추가적인 제출 로직을 여기에 작성
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
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full">
          {/* 뒤로가기 버튼 + "내 정보 수정하기" 글자 */}
          <div className="mt-12 h-12 flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
                size={20} // 아이콘 크기 조정
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-xl font-bold text-center">
              내 정보 수정하기
            </div>
          </div>

          {/* 닉네임 */}
          <div className="mt-6 font-bold text-zp-xl text-zp-gray">닉네임</div>
          <div className="relative">
            <input
              className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-8 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setNickname('')}
              style={{ width: '24px', height: '24px' }} // 아이콘 크기 조정
            />
            {nicknameError && (
              <div className="text-zp-red font-bold text-zp-xs mt-1">
                {nicknameError}
              </div>
            )}
          </div>
          <ul className="mt-2 list-disc pl-6 text-zp-2xs">
            <li>
              일부 특수문자 사용 불가 (&, &lt;, &gt;, (, ), ‘, /, “, 콤마),
              이모티콘 사용 불가
            </li>
            <li>최대 10자 이내</li>
            <li>띄어쓰기 불가능</li>
          </ul>

          {/* 휴대폰 번호 */}
          <div className="mt-6 font-bold text-zp-xl text-zp-gray">
            휴대폰 번호
          </div>
          <div className="relative">
            <input
              className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="010-1234-5678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-8 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPhoneNumber('')}
              style={{ width: '24px', height: '24px' }}
            />
            {phoneNumberError && (
              <div className="text-zp-red font-bold text-zp-xs mt-1">
                {phoneNumberError}
              </div>
            )}
          </div>

          {/* 자택 주소 */}
          <div className="mt-6 font-bold text-zp-xl text-zp-gray">
            자택 주소
          </div>
          <div className="relative">
            <input
              className="mt-2 w-full h-12 px-4 font-bold text-zp-xl text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="자택 주소를 입력하세요"
              value={address}
              onClick={() => setIsPostcodeOpen(true)}
              readOnly
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-8 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setAddress('')}
              style={{ width: '24px', height: '24px' }}
            />
            {addressError && (
              <div className="text-zp-red font-bold text-zp-xs mt-1">
                {addressError}
              </div>
            )}
          </div>

          {/* Daum Postcode Modal */}
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
