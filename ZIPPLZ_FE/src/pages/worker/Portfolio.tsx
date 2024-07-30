import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiBookmark, CiBookmarkCheck } from 'react-icons/ci';
// CiBookmarkCheck 추가
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false); // 북마크 상태 추가
  const navigate = useNavigate();

  const overviewClick = () => {
    setActiveTab('overview');
    navigate('../OverView');
  };

  const workerScheduleClick = () => {
    setActiveTab('workerSchedule');
    navigate('../WorkerSchedule');
  };

  const reviewClick = () => {
    setActiveTab('review');
    navigate('../Review');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked); // 북마크 상태 토글
  };

  let [area, setArea] = useState('서울, 경기');
  let [tel, setTel] = useState('010-9909-8322');
  let [skills, setSkills] = useState<string[]>(['도배', '타일', '벽지']);

  return (
    <>
      {/* 북마크 이미지 */}
      <div className="w-[550px] flex justify-end">
        {isBookmarked ? (
          <CiBookmarkCheck
            size={32}
            className="cursor-pointer"
            onClick={toggleBookmark}
          />
        ) : (
          <CiBookmark
            size={32}
            className="cursor-pointer"
            onClick={toggleBookmark}
          />
        )}
      </div>

      <div className="font-bold flex items-start space-x-8 p-4">
        {/* 사진, 이름 */}
        <div>
          <div className="w-32 h-32 grid place-items-center">
            <CgProfile size={120} />
          </div>
          <div className="w-32 h-8 grid place-items-center text-zp-xl text-zp-black">
            강신구
          </div>
        </div>

        {/* 지역, 전화번호, 분야 */}
        <div className="flex flex-col space-y-2 text-zp-xs text-zp-black">
          <div className="w-64 h-8">Area : {area}</div>
          <div className="w-64 h-8">Phone : {tel}</div>
          <div className="w-64 h-8 flex space-x-2">
            {/* Skills as buttons */}
            {skills.map((skill, index) => (
              <button
                key={index}
                className="w-16 h-8 px-2 py-1 bg-zp-sub-color rounded-zp-radius-big"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          className={`font-bold w-32 h-8 text-zp-xs ${activeTab === 'overview' ? 'rounded-zp-radius-btn border-x-2 border-t-2 border-zp-main-color' : 'rounded-zp-radius-btn border-b-2 border-zp-main-color'}`}
          onClick={overviewClick}
        >
          종합 정보
        </button>
        <button
          className={`font-bold w-32 h-8 text-zp-xs ${activeTab === 'workerSchedule' ? 'rounded-zp-radius-btn border-x-2 border-t-2 border-zp-main-color' : 'rounded-zp-radius-btn border-b-2 border-zp-main-color'}`}
          onClick={workerScheduleClick}
        >
          시공자 일정
        </button>
        <button
          className={`font-bold w-32 h-8 text-zp-xs ${activeTab === 'review' ? 'rounded-zp-radius-btn border-x-2 border-t-2 border-zp-main-color' : 'rounded-zp-radius-btn border-b-2 border-zp-main-color'}`}
          onClick={reviewClick}
        >
          후기
        </button>
      </div>
    </>
  );
}
