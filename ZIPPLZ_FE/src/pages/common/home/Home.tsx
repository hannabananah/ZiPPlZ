import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import FieldListItem from '@components/home/FieldListItem';
import WorkerCard from '@components/home/WorkerCard';

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
  return (
    <div className="bg-zp-light-beige flex flex-col p-7 gap-6 overflow-auto min-h-screen mb-6">
      <ScheduleCalendar />
      <div className="w-full flex gap-6 justify-center items-center">
        <div className="basis-2/3">
          <p className="font-extrabold text-zp-xl">Today</p>
          <div className="w-full bg-zp-main-color h-5"></div>
        </div>
        <div className="basis-1/3">
          <p className="font-extrabold text-zp-xl">This week</p>
          <div className="w-full bg-zp-main-color h-5"></div>
        </div>
      </div>
      <div className="w-full">
        <p className="font-extrabold text-zp-xl">찾으시는 시공이 있으신가요?</p>
        <p className="font-bold text-zp-2xs text-zp-gray">
          선택한 시공에 맞춰 인증된 전문 기술자를 추천해드립니다.
        </p>
      </div>
      <div className="w-full grid grid-cols-6 gap-4">
        {fields.map((item) => (
          <FieldListItem field={item} />
        ))}
      </div>
      <p className="font-extrabold text-zp-xl">HOT한 시공업자</p>
      <div className="w-full grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <WorkerCard worker={list[0]} />
        <WorkerCard worker={list[1]} />
        <WorkerCard worker={list[2]} />
        <WorkerCard worker={list[3]} />
      </div>
    </div>
  );
}
