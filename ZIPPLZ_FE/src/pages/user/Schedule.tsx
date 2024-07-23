import { useState } from 'react';

import Calendar from '@/components/common/Calendar';
import Selectbar from '@/components/common/Selectbar';
import SchedulerCardExist from '@/components/scheduler/card/SchedulerCardExist';
import SharedImg from '@/components/scheduler/sharedFile/SharedImg';
import SharedMemo from '@/components/scheduler/sharedFile/SharedMemo';
import SchedulerCard from '@components/scheduler/card/SchedulerCard';

export default function Schedule() {
  const options: string[] = ['집1', '집2', '집3'];
  const [selectedValue, setSelectedValue] = useState<string>(options[0]);
  return (
    <div className="flex flex-col items-center bg-zp-light-beige gap-4 sm px-2 lg px-4">
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
      <Calendar />
      <p className="w-full text-zp-xl font-bold ">공유 문서</p>
      <div className="flex justify-between items-center gap-4">
        <SharedImg />
        <SharedMemo />
      </div>
      <p className="w-full text-right text-zp-xl font-bold ">
        총 시공 가격 : 1000000원
      </p>
      <SchedulerCard />
      <SchedulerCardExist />
    </div>
  );
}
