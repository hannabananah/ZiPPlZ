import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
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
      {/* 북마크 이미지 */}
      <div className="w-full flex justify-end">
        {isBookmarked ? (
          <IoBookmark
            size={24}
            className="cursor-pointer"
            onClick={toggleBookmark}
          />
        ) : (
          <IoBookmarkOutline
            size={24}
            className="cursor-pointer"
            onClick={toggleBookmark}
          />
        )}
      </div>

      <div className="w-full font-bold flex items-start space-x-8 p-2">
        {/* 사진, 이름 */}
        <div>
          <div className="grid w-32 h-32 place-items-center">
            <CgProfile size={120} />
          </div>
          <div className="grid w-32 h-8 place-items-center text-zp-xl text-zp-black">
            강신구
          </div>
        </div>

        {/* 지역, 전화번호, 분야 */}
        <div className="w-full flex flex-col text-zp-xs text-zp-black">
          <div className="w-full h-4">Area : {area}</div>
          <div className="w-full h-4">Phone : {tel}</div>
          <div className="w-full h-4 flex flex-wrap gap-2">
            {/* Skills as buttons */}
            {skills.map((skill, index) => (
              <button
                key={index}
                className="flex-1 min-w-[100px] h-8 px-2 py-1 bg-zp-sub-color rounded-zp-radius-big"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="font-bold w-full flex ">
        <div
          className={`flex-1 ${
            activeTab === 'overview'
              ? 'rounded-t-zp-radius-btn border-x-2 border-t-2 border-zp-main-color'
              : 'rounded-b-lg border-b-2 border-zp-main-color'
          }`}
        >
          <Button
            children="종합 정보"
            buttonType="light"
            width="100%" // 퍼센트 너비로 설정
            height={2}
            fontSize="xs"
            radius="btn"
            onClick={overviewClick}
          />
        </div>
        <div
          className={`flex-1 ${
            activeTab === 'workerschedule'
              ? 'rounded-t-zp-radius-btn border-x-2 border-t-2 border-zp-main-color'
              : 'rounded-b-lg border-b-2 border-zp-main-color'
          }`}
        >
          <Button
            children="시공자 일정"
            buttonType="light"
            width="100%" // 퍼센트 너비로 설정
            height={2}
            fontSize="xs"
            radius="btn"
            onClick={workerScheduleClick}
          />
        </div>
        <div
          className={`flex-1 ${
            activeTab === 'review'
              ? 'rounded-t-zp-radius-btn border-x-2 border-t-2 border-zp-main-color'
              : 'rounded-b-lg border-b-2 border-zp-main-color'
          }`}
        >
          <Button
            children="후기"
            buttonType="light"
            width="100%" // 퍼센트 너비로 설정
            height={2}
            fontSize="xs"
            radius="btn"
            onClick={reviewClick}
          />
        </div>
      </div>
      <div className="mb-10">
        {activeTab === 'overview' && <OverView />}
        {activeTab === 'workerschedule' && <WorkerSchedule />}
        {activeTab === 'review' && <WorkerReview />}
      </div>
    </>
  );
}
