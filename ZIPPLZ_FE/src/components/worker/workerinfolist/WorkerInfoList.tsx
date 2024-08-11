import { useEffect, useState } from 'react';

import WorkerInfoListItem from '@/components/worker/workerinfolist/WorkerInfoListItem';

const data = [
  {
    portfolio_serial: 1,
    worker: 1,
    user_name: 'celine5',
    birth_date: 99,
    temperature: 36.5,
    field_id: 1,
    field_name: '철거',
    career: 3.0,
    certificated_badge: 1,
    locations: ['서울 강남구', '서울 강서구'],
    img: 'save_file_path1',
  },
  {
    portfolio_serial: 2,
    worker: 1,
    user_name: 'celine5',
    birth_date: 99,
    temperature: 36.5,
    field_id: 2,
    field_name: '설비',
    career: 30.0,
    certificated_badge: 1,
    locations: ['서울 강남구', '서울 강서구'],
    img: 'save_file_path2',
  },
];
interface Props {
  field?: number;
}
export default function WorkerInfoList({ field }: Props) {
  const [workerList, setWorkerList] = useState<any>(data);
  console.log(field);
  return (
    <>
      {workerList || workerList.length > 0 ? (
        <div className="grid w-full grid-cols-3 h-[40rem] overflow-auto gap-4 sm:grid-cols-3 md:grid-cols-4">
          {workerList.map((worker: any) => (
            <WorkerInfoListItem worker={worker} />
          ))}
        </div>
      ) : (
        <p>선택한 조건에 해당하는 시공자가 없습니다.</p>
      )}
    </>
  );
}
