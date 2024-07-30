import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoBookmark } from 'react-icons/io5';
import { IoBookmarkOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Button from '@components/common/Button';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false); // 북마크 상태 추가
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

  let [area, setArea] = useState<string>('서울, 경기');
  let [tel, setTel] = useState<string>('010-9909-8322');
  let [skills, setSkills] = useState<string[]>(['도배', '타일', '벽지']);

  return (
    <>
      {/* 북마크 이미지 */}
      <div className="w-full flex justify-end">
        {isBookmarked ? (
          <IoBookmark
            size={32}
            className="cursor-pointer"
            onClick={toggleBookmark}
          />
        ) : (
          <IoBookmarkOutline
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
        <div className="w-full flex flex-col space-y-2 text-zp-xs text-zp-black">
          <div className="w-full h-8">Area : {area}</div>
          <div className="w-full h-8">Phone : {tel}</div>
          <div className="w-full h-8 flex space-x-2">
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

      <div className="font-bold w-1/4 flex justify-start">
        <div
          className={`${activeTab === 'overview' ? 'rounded-t-lg border-x-2 border-t-2 border-zp-main-color' : 'rounded-b-lg border-b-2 border-zp-main-color'}`}
        >
          <Button
            children="종합 정보"
            buttonType="light"
            width={8}
            height={2}
            fontSize="xs"
            radius="btn"
            onClick={overviewClick}
          />
        </div>
        <div
          className={`${activeTab === 'workerSchedule' ? 'rounded-t-lg border-x-2 border-t-2 border-zp-main-color' : 'rounded-b-lg border-b-2 border-zp-main-color'}`}
        >
          <Button
            children="시공자 일정"
            buttonType="light"
            width={8}
            height={2}
            fontSize="xs"
            radius="btn"
            onClick={workerScheduleClick}
          />
        </div>
        <div
          className={`${activeTab === 'review' ? 'rounded-t-lg border-x-2 border-t-2 border-zp-main-color' : 'rounded-b-lg border-b-2 border-zp-main-color'}`}
        >
          <Button
            children="후기"
            buttonType="light"
            width={8}
            height={2}
            fontSize="xs"
            radius="full"
            onClick={reviewClick}
          />
        </div>
      </div>
    </>
  );
}
