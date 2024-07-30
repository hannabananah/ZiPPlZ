import { GoArrowLeft } from 'react-icons/go';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function MyInformationModify() {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
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
          <div className="mt-6 h-10 text-zp-lg text-zp-gray">닉네임</div>
          <div className="relative">
            <input
              className="w-full h-[60px] px-4 text-zp-lg text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10" // Add padding-right to make space for the icon
              placeholder="백승범123"
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              style={{ width: '24px', height: '24px' }} // Adjust icon size as needed
            />
          </div>
          <ul className="mt-2 list-disc pl-6 text-zp-2xs">
            <li>
              일부 특수문자 사용 불가 (&, &lt;, &gt;, (, ), ‘, /, “, 콤마),
              이모티콘 사용 불가
            </li>
            <li>최대 8자 이내</li>
            <li>띄어쓰기 불가능</li>
            <li>월 최대 4회까지만 변경 가능</li>
          </ul>

          {/* 휴대폰 번호 */}
          <div className="mt-6 h-10 text-zp-lg text-zp-gray">휴대폰 번호</div>
          <div className="relative">
            <input
              className="w-full h-[60px] px-4 text-zp-lg text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="010-12"
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              style={{ width: '24px', height: '24px' }}
            />
          </div>

          {/* 집 주소 */}
          <div className="mt-6 h-10 text-zp-lg text-zp-gray">집 주소</div>
          <div className="relative">
            <input
              className="w-full h-[60px] px-4 text-zp-lg text-zp-black bg-zp-light-beige border border-zp-sub-color rounded-zp-radius-big focus:border-zp-main-color pr-10"
              placeholder="집 주소 api"
            />
            <IoIosCloseCircleOutline
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              style={{ width: '24px', height: '24px' }}
            />
          </div>

          <div className="mt-6 w-full h-[60px] text-zp-2xl font-bold bg-zp-sub-color rounded-zp-radius-btn flex justify-center items-center">
            수정완료
          </div>
        </div>
      </div>
    </>
  );
}
