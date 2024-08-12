import { FaRegCalendarAlt } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';
import { GrUserWorker } from 'react-icons/gr';
import { MdOutlineDesignServices } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function DontUseZIPPLZ() {
  let user: string = '강신구';
  const navigate = useNavigate();

  // 페이지 돌아가기 핸들러
  const handleGoBack = () => {
    navigate('-1');
  };

  // 탈퇴하기 핸들러
  const handleResign = () => {
    navigate('/beforeResign');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen p-6 bg-gray-100">
        <div className="w-full flex-grow">
          {/* 뒤로가기 버튼 */}
          <div className="flex items-center">
            <GoArrowLeft
              className="mr-6 cursor-pointer"
              onClick={handleGoBack}
              size={20} // 아이콘 크기 조정
            />
          </div>

          <div className="mt-6 w-[400px] h-24">
            <div className="text-zp-3xl font-bold">{user}님,</div>
            <div className="text-zp-3xl font-bold">이런 기능도 써보셨나요?</div>
          </div>

          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="mb-6">
                <MdOutlineDesignServices size={170} />
              </div>
              <div className="w-[170px] h-7 font-bold text-zp-xl mb-4">
                편리하게 10분만에
              </div>
              <div className="w-[168px] h-10 font-bold text-zp-3xl mb-4">
                AI 인테리어
              </div>
              <div className="w-[170px] h-12 font-bold text-zp-xl bg-zp-sub-color rounded-zp-radius-btn flex items-center justify-center cursor-pointer">
                이용하기
              </div>
            </div>
          </div>

          <hr className="mt-6 w-full border-zp-light-gray" />

          <div className="mt-6 flex items">
            <div>
              <FaRegCalendarAlt size={72} />
            </div>
            <div className="h-5 p-2 font-bold text-zp-xl">
              캘린더
              <div className="mt-2 font-bold text-zp-gray text-zp-xl">
                나만의 인테리어 일정 세우기
              </div>
            </div>
          </div>

          <div className="mt-6 flex items">
            <div>
              <GrUserWorker size={72} />
            </div>
            <div className="h-5 p-2 font-bold text-zp-xl">
              시공자 검색
              <div className="mt-2 font-bold text-zp-gray text-zp-xl">
                공종별 최고의 시공 전문가와 함께 인테리어 하기
              </div>
            </div>
          </div>
        </div>

        {/* 넘어가기 버튼 */}
        <div
          className="w-full h-[60px] rounded-zp-radius-btn bg-zp-sub-color flex justify-center items-center mt-auto cursor-pointer"
          onClick={handleResign}
        >
          <div className="text-zp-2xl font-bold">넘어가기</div>
        </div>
      </div>
    </>
  );
}
