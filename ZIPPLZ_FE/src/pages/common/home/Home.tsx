import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getWorksByUser } from '@apis/scheduler/schedulerApi';
import Button from '@components/common/Button';
import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import FieldListItem from '@components/home/FieldListItem';
import ImageChangeTab from '@components/home/ImageChangeTab';
import TodaySchedule from '@components/home/TodaySchedule';
import WorkerCard from '@components/home/WorkerCard';
import { useLoginUserStore } from '@stores/loginUserStore';

const fields: string[] = [
  '전체',
  '철거',
  '설비',
  '샷시',
  '목공',
  '전기',
  '욕실',
  '타일',
  '마루',
  '도배',
  '가구',
  '기타',
];
export interface HotWorker {
  name: string;
  region: string;
  field: string;
  temp: string;
}
const list: HotWorker[] = [
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
  { name: '김현태', region: '서울 강남구', field: '전기', temp: '36.5도' },
];
interface Work {
  starDate: string;
  endDate: string;
  fiield: string;
}

export default function Home() {
  const [scheduleList, setScheduleList] = useState<Work[]>([]);
  const navigate = useNavigate();
  const { loginUser } = useLoginUserStore();
  const handleClickImageChange = () =>
    navigate(`/image-change/${loginUser?.userSerial}&tab=change`);
  const fetchWorks = async () => {
    const response = await getWorksByUser();
    setScheduleList(response.data.data);
  };
  const handleClickField = (field: string) => {
    navigate(`/workers?field=${field}`);
  };
  useEffect(() => {
    if (loginUser?.role) {
      fetchWorks();
    }
  }, []);
  return (
    <div className="relative flex flex-col gap-6 mt-8 mb-6 overflow-auto bg-zp-light-beige p-7">
      <div className="w-full p-4 rounded-zp-radius-big bg-zp-white">
        <ScheduleCalendar workList={scheduleList} />
        {(!loginUser || loginUser.role === '') && (
          <div className="absolute flex justify-center items-center top-[2rem] left-[2rem] w-[85%] rounded-zp-radius-big bg-[rgba(255,255,255,0.5)] aspect-square z-10">
            <div className="flex flex-col justify-center items-center w-[80%] h-[40%] bg-zp-light-beige opacity-100 z-100 rounded-zp-radius-big gap-4 p-4">
              <p className="font-bold text-center text-zp-xs">
                나만의 시공 업무를 관리하고 싶다면?
              </p>
              <Button
                buttonType="second"
                children="로그인 하기"
                fontSize="xs"
                width="40%"
                height={2}
                radius="btn"
                onClick={() => navigate('/member/login')}
              />
            </div>
          </div>
        )}
      </div>
      {loginUser && loginUser.role !== '' && (
        <div className="flex items-start justify-center w-full gap-2 md:gap-6 ">
          <div className="basis-7/12">
            <p className="font-extrabold text-zp-xl">Today</p>
            <TodaySchedule role={loginUser?.role || ''} />
          </div>
          <div className="basis-5/12">
            <p className="font-extrabold text-zp-xl">Image Change</p>
            {/* <div className="w-full h-[4rem]"> */}
            <ImageChangeTab onClick={handleClickImageChange} />
            {/* </div> */}
          </div>
        </div>
      )}
      <div className="w-full">
        <p className="font-extrabold text-zp-xl">찾으시는 시공이 있으신가요?</p>
        <p className="font-bold text-zp-2xs text-zp-gray">
          선택한 시공에 맞춰 인증된 전문 기술자를 추천해드립니다.
        </p>
      </div>
      <div className="grid w-full grid-cols-6 gap-4 ">
        {fields.map((item) => (
          <FieldListItem
            field={item}
            handlClickField={() => handleClickField(item)}
          />
        ))}
      </div>
      <p className="font-extrabold text-zp-xl">HOT한 시공업자</p>
      <div className="flex w-full overflow-x-auto">
        {/* <div className="flex w-full space-x-4"> */}
        <div className="flex justify-between w-full h-[8rem] ">
          <WorkerCard worker={list[0]} />

          <WorkerCard worker={list[1]} />

          <WorkerCard worker={list[2]} />

          <WorkerCard worker={list[3]} />

          <WorkerCard worker={list[3]} />

          <WorkerCard worker={list[3]} />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
