import { useState } from 'react';

import Selectbar from '@components/common/Selectbar';
import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import SchedulerCard from '@components/scheduler/card/SchedulerCard';
import SchedulerCardExist from '@components/scheduler/card/SchedulerCardExist';
import ScheduleRegist from '@components/scheduler/regist/ScheduleRegist';
import SharedImg from '@components/scheduler/sharedFile/SharedImg';
import SharedMemo from '@components/scheduler/sharedFile/SharedMemo';

interface ConstructionSchedule {
  시공자이름: string;
  시공기간: string; // yyyy-mm-dd ~ yyyy-mm-dd
  사용한자재: string;
  특이사항: string;
  업체명: string;
  가격: number;
}

export interface ConstructionData {
  id: number;
  시공분야: string;
  스케줄: ConstructionSchedule | null;
}

const dummyData: ConstructionData[] = [
  {
    id: 1,
    시공분야: '철거',
    스케줄: {
      시공자이름: '홍길동',
      시공기간: '2024-07-01 ~ 2024-07-03',
      사용한자재: '철거 장비',
      특이사항: '사전 준비 필요',
      업체명: '철거 전문 업체',
      가격: 10000,
    },
  },
  {
    id: 2,
    시공분야: '설비',
    스케줄: {
      시공자이름: '김설비',
      시공기간: '2024-07-04 ~ 2024-07-06',
      사용한자재: '배관 자재',
      특이사항: '전기와 협업 필요',
      업체명: '설비 전문가',
      가격: 10000,
    },
  },
  {
    id: 3,
    시공분야: '샷시',
    스케줄: {
      시공자이름: '이샷시',
      시공기간: '2024-07-07 ~ 2024-07-08',
      사용한자재: '알루미늄 샷시',
      특이사항: '정확한 치수 필요',
      업체명: '샷시 마스터',
      가격: 10000,
    },
  },
  {
    id: 4,
    시공분야: '목공',
    스케줄: {
      시공자이름: '박목수',
      시공기간: '2024-07-09 ~ 2024-07-11',
      사용한자재: '목재',
      특이사항: '정밀 작업 필요',
      업체명: '목공 전문업체',
      가격: 10000,
    },
  },
  {
    id: 5,
    시공분야: '전기',
    스케줄: {
      시공자이름: '최전기',
      시공기간: '2024-07-12 ~ 2024-07-13',
      사용한자재: '전기 배선',
      특이사항: '안전 우선',
      업체명: '전기 전문가',
      가격: 10000,
    },
  },
  {
    id: 6,
    시공분야: '욕실',
    스케줄: {
      시공자이름: '김욕실',
      시공기간: '2024-07-14 ~ 2024-07-16',
      사용한자재: '욕실 타일, 욕조',
      특이사항: '방수 필수',
      업체명: '욕실 전문업체',
      가격: 10000,
    },
  },
  { id: 7, 시공분야: '타일', 스케줄: null },
  {
    id: 8,
    시공분야: '마루',
    스케줄: {
      시공자이름: '박마루',
      시공기간: '2024-07-19 ~ 2024-07-20',
      사용한자재: '원목 마루',
      특이사항: '표면 처리 필요',
      업체명: '마루 시공 전문',
      가격: 10000,
    },
  },
  { id: 9, 시공분야: '도배', 스케줄: null },
  {
    id: 10,
    시공분야: '가구',
    스케줄: {
      시공자이름: '홍가구',
      시공기간: '2024-07-23 ~ 2024-07-24',
      사용한자재: '맞춤형 가구',
      특이사항: '현장 설치 필요',
      업체명: '가구 제작사',
      가격: 10000,
    },
  },
];
function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function Schedule() {
  const options: string[] = ['집1', '집2', '집3'];
  const [selectedValue, setSelectedValue] = useState<string>(options[0]);
  const [scheduleList, setScheduleList] =
    useState<ConstructionData[]>(dummyData);
  return (
    <div className="flex flex-col w-full max-w-screen-md items-center bg-zp-light-beige gap-4 sm lg px-4">
      <Selectbar
        fontColor="main"
        options={options}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        width="full"
        height={2}
        fontSize="lg"
        radius="btn"
        border="main"
        hover="sub"
        backgroundColor="white"
      />
      <ScheduleCalendar />
      <p className="w-full text-zp-xl font-bold ">공유 문서</p>
      <div className="flex justify-between items-center gap-4">
        <SharedImg />
        <SharedMemo />
      </div>
      <p className="w-full text-right text-zp-xl font-bold ">
        총 시공 가격 : {numberWithCommas(1000000)}원
      </p>
      {scheduleList.map((item, idx) =>
        item.스케줄 ? (
          <SchedulerCardExist key={idx} schedule={item} />
        ) : (
          <SchedulerCard key={idx} schedule={item} />
        )
      )}
      <ScheduleRegist
        scheduleList={scheduleList}
        setScheduleList={setScheduleList}
      />
    </div>
  );
}
