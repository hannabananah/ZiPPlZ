import { FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ResignComplete() {
  const navigate = useNavigate();

  // 홈으로 이동 핸들러
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-6 bg-zp-gray">
        <div className="text-center">
          {/* 체크 아이콘 */}
          <div className="flex justify-center items-center mb-6">
            <FaRegCheckCircle
              className="text-green-500"
              style={{ width: '167px', height: '167px' }}
            />
          </div>

          {/* 탈퇴 완료 텍스트 */}
          <div className="text-zp-3xl font-bold mb-4">탈퇴 완료</div>

          {/* 안내 문구 */}
          <div className="w-[360px] h-[60px] text-zp-sm font-bold mb-6">
            ZIP-PlZ를 이용해주시고 사랑해주셔서 감사합니다. 더욱더 노력하고
            발전하는 ZIP-PlZ가 되겠습니다.
          </div>

          {/* 홈으로 버튼 */}
          <button
            className="w-[170px] h-[60px] rounded-zp-radius-btn bg-zp-sub-color text-zp-xs font-bold"
            onClick={handleGoHome}
          >
            홈으로
          </button>
        </div>
      </div>
    </>
  );
}
