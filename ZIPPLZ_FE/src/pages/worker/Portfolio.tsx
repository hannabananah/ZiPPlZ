import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiBookmark } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

export default function Portfolio() {
  const navigate = useNavigate();

  const overviewClick = () => {
    navigate('../OverView');
  };

  const workerScheduleClick = () => {
    navigate('../WorkerSchedule');
  };

  const reviewClick = () => {
    navigate('../Review');
  };

  let [area, setArea] = useState('서울, 경기');
  let [tel, setTel] = useState('010-9909-8322');
  let [skills, setSkills] = useState('도배, 타일, 벽지');

  return (
    <>
      {/* 북마크 이미지 */}
      <div className="w-[550px] flex justify-end">
        <button className="w-8 h-8">
          <CiBookmark size={32} />
        </button>
      </div>

      <div className="font-['nanum'] font-bold flex items-start space-x-8 p-4">
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
            {skills.split(', ').map((skill, index) => (
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
          className="font-['nanum'] font-bold w-32 h-8 text-zp-xs"
          onClick={overviewClick}
        >
          종합 정보
        </button>
        <button
          className="font-['nanum'] font-bold w-32 h-8 text-zp-xs"
          onClick={workerScheduleClick}
        >
          시공자 일정
        </button>
        <button
          className="font-['nanum'] font-bold w-32 h-8 text-zp-xs"
          onClick={reviewClick}
        >
          후기
        </button>
      </div>

      <hr className="w-[550px] border-1 border-zp-main-color" />
    </>
  );
}
