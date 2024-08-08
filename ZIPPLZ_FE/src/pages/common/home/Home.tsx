// import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import { useNavigate } from 'react-router-dom';

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
export default function Home() {
  const navigate = useNavigate();
  const { loginUser } = useLoginUserStore();
  const handleClickImageChange = () =>
    navigate(`/image-change/${loginUser?.userSerial}&tab=change`);
  return (
    <div className="flex flex-col gap-6 mt-8 mb-6 overflow-auto bg-zp-light-beige p-7">
      {/* <ScheduleCalendar /> */}
      <div className="flex items-start justify-center w-full gap-2 md:gap-6 ">
        <div className="basis-7/12">
          <p className="font-extrabold text-zp-xl">Today</p>
          {/* <div className="w-full h-[4rem]"> */}
          <TodaySchedule />
          {/* </div> */}
        </div>
        <div className="basis-5/12">
          <p className="font-extrabold text-zp-xl">Image Change</p>
          {/* <div className="w-full h-[4rem]"> */}
          <ImageChangeTab onClick={handleClickImageChange} />
          {/* </div> */}
        </div>
      </div>
      <div className="w-full">
        <p className="font-extrabold text-zp-xl">찾으시는 시공이 있으신가요?</p>
        <p className="font-bold text-zp-2xs text-zp-gray">
          선택한 시공에 맞춰 인증된 전문 기술자를 추천해드립니다.
        </p>
      </div>
      <div className="grid w-full grid-cols-6 gap-4">
        {fields.map((item) => (
          <FieldListItem field={item} />
        ))}
      </div>
      <p className="font-extrabold text-zp-xl">HOT한 시공업자</p>
      <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <WorkerCard worker={list[0]} />
        <WorkerCard worker={list[1]} />
        <WorkerCard worker={list[2]} />
        <WorkerCard worker={list[3]} />
      </div>
    </div>
  );
}
