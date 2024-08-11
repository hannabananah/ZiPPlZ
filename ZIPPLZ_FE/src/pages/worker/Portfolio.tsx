import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiLocationOn } from 'react-icons/ci';
import { GrTools } from 'react-icons/gr';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { IoCallOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';

import OverView from './tabs/OverView';
import WorkerReview from './tabs/WorkerReview';
import WorkerSchedule from './tabs/WorkerSchedule';

export default function Portfolio() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false); // 북마크 상태 추가

  // URL 쿼리 파라미터에서 activeTab 읽기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const overviewClick = () => {
    setActiveTab('overview');
    navigate('/workers/1/portfolio?tab=overview');
  };

  const workerScheduleClick = () => {
    setActiveTab('workerschedule');
    navigate('/workers/1/portfolio?tab=workerschedule');
  };

  const reviewClick = () => {
    setActiveTab('review');
    navigate('/workers/1/portfolio?tab=review');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked); // 북마크 상태 토글
  };

  let area: string = '서울, 경기';
  let tel: string = '010-9909-8322';
  let skills: string[] = ['도배', '타일', '벽지'];

  return (
    <>
      <div className="flex flex-col w-full gap-2 min-h-screen p-6 mt-[4rem]">
        <div className="relative flex items-start w-full gap-6 font-bold">
          {/* 사진, 이름 */}
          <div className="flex flex-col items-center">
            <CgProfile size={100} />
            <p className="font-bold text-zp-lg">강신구</p>
          </div>

          {/* 지역, 전화번호, 분야 */}
          <div className="flex flex-col mt-4 font-bold text-zp-xs">
            <div className="flex items-center gap-2">
              <CiLocationOn />
              <p>{area}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoCallOutline />
              <p>{tel}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <GrTools />
                <p>Skills</p>
              </div>

              {/* Skills as buttons */}
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <Button
                    buttonType="second"
                    width={4}
                    height={2}
                    fontSize="xs"
                    radius="big"
                    key={index}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {/* 북마크 이미지 */}
          {isBookmarked ? (
            <IoBookmark
              size={24}
              className="absolute cursor-pointer right-4"
              color="#73744a"
              onClick={toggleBookmark}
            />
          ) : (
            <IoBookmarkOutline
              size={24}
              className="absolute cursor-pointer right-4"
              color="#73744a"
              onClick={toggleBookmark}
            />
          )}
        </div>
        {/* 버튼 섹션 */}
        <div className="grid w-full grid-cols-3 font-bold text-zp-sm">
          <div
            className={`p-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'rounded-t-zp-radius-big border-x-2 border-t-2 border-zp-main-color'
                : 'rounded-b-lg border-b-2 border-zp-main-color'
            }`}
          >
            <p className="text-center" onClick={overviewClick}>
              종합정보
            </p>
          </div>
          <div
            className={`p-2 cursor-pointer ${
              activeTab === 'workerschedule'
                ? 'rounded-t-zp-radius-big border-x-2 border-t-2 border-zp-main-color'
                : 'rounded-b-lg border-b-2 border-zp-main-color'
            }`}
          >
            <p className="text-center" onClick={workerScheduleClick}>
              시공자 일정
            </p>
          </div>

          <div
            className={`p-2 cursor-pointer ${
              activeTab === 'review'
                ? 'rounded-t-zp-radius-big border-x-2 border-t-2 border-zp-main-color'
                : 'rounded-b-lg border-b-2 border-zp-main-color'
            }`}
          >
            <p className="text-center" onClick={reviewClick}>
              후기
            </p>
          </div>
        </div>
        <div className="mb-[4rem]">
          {activeTab === 'overview' && <OverView />}
          {activeTab === 'workerschedule' && <WorkerSchedule />}
          {activeTab === 'review' && <WorkerReview />}
        </div>
      </div>
    </>
  );
}
