import { CgProfile } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { CiBookmark } from 'react-icons/ci';
import { GoArrowLeft } from 'react-icons/go';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function FindWorkerDetail() {
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('/FindWorkerList');
  };

  return (
    <>
      <div className=" flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          {/* 나가기 버튼, 구인 글쓰기 text */}
          <div className="flex items-center justify-between w-full relative">
            <div className="flex items-center">
              <GoArrowLeft
                className="mr-6 cursor-pointer"
                onClick={handleGoBack}
              />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-zp-xl font-bold text-center">
              시공자 찾기
            </div>
          </div>

          {/* 임의의 사진 추가 */}
          <div className="pt-6">
            <img
              src="https://via.placeholder.com/800x400" // 임의의 사진 URL
              alt="Sample"
              className="w-full h-auto rounded-zp-radius-big"
            />
          </div>

          <div className="pt-6 text-zp-xl font-bold">
            깔끔하고 하자 없는 장판 시공 해주실분 구합니다.
          </div>

          <div className="pt-6 pb-2 flex items-center space-x-2">
            <div>
              <CgProfile />
            </div>
            <div className="text-zp-xs font-bold">눈누난나</div>
          </div>

          <div className="border rounded-zp-radius-big border-zp-main-color bg-zp-white p-4 border border-gray-300 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div>
                <CiLocationOn size={20} />
              </div>
              <div className="text-zp-2xs">Location</div>
            </div>
            <div className="text-zp-xs font-bold">
              인천광역시 부평구 부평문화로 37 (부평동, 부평동아이파트)
            </div>
          </div>

          <div className="pt-6 pb-2 text-zp-lg font-bold">작업내용</div>
          <div className="w-[550px] h-60 text-zp-xs font-bold text-zp-gray">
            모던하면서도 너무 밋밋하지 않은 디자인의 장판으로 바닥을 한번 싹다
            바꿔볼까하는데 잘 해주시는 분 찾고 있습니다. 시공쪽을 잘 몰라서
            친절하게 알려주실 분 계신가요? 모던하면서도 너무 밋밋하지 않은
            디자인의 장판으로 바닥을 한번 싹다 바꿔볼까하는데 잘 해주시는 분
            찾고 있습니다. 음하 모던하면서도 너무 밋밋하지 않은 디자인의
            장판으로 바닥을 한번 싹다 바꿔볼까하는데 잘 해주시는 분 찾고
            있습니다. 시공쪽을 잘 몰라서 친절하게 알려주실 분 계신가요?
            모던하면서도 너무 밋밋하지 않은 디자인의 장판으로 바닥을 한번 싹다
            바꿔볼까하는데 잘 해주시는 분 찾고 있습니다. 음하 모던하면서도 너무
            밋밋하지 않은 디자인의 장판으로 바닥을 한번 싹다 바꿔볼까하는데 잘
            해주시는 분 찾고 있습니다. 시공쪽을 잘 몰라서 친절하게 알려주실 분
            계신가요? 모던하면서도 너무 밋밋하지 않은 디자인의 장판으로 바닥을
            한번 싹다 바꿔볼까하는데 잘 해주시는 분 찾고 있습니다. 음나냐~
          </div>

          <hr />

          <div className="flex items-center space-x-2">
            <div className="font-bold h-20 flex items-center justify-center">
              <button className="w-[210px] h-[38px] bg-zp-sub-color rounded-zp-radius-btn text-white">
                <div className="flex items-center justify-center space-x-2 w-full">
                  <CiBookmark size={24} />
                  <div>찜하기</div>
                </div>
              </button>
            </div>

            <div className="font-bold h-20 flex items-center justify-center">
              <button className="w-[320px] h-[38px] bg-zp-sub-color rounded-zp-radius-btn text-white">
                <div className="flex items-center justify-center space-x-2 w-full">
                  <IoChatbubblesOutline size={24} />
                  <div>채팅하기</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
