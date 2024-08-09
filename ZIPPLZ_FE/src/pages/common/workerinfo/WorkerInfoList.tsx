import { useEffect, useState } from 'react';

import WorkerInfoListItem from '@/components/worker/WorkerInfoListItem';

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
  {
    portfolio_serial: 3,
    worker: 2,
    user_name: 'celine6',
    birth_date: 99,
    temperature: 36.5,
    field_id: 3,
    field_name: '샷시',
    career: 20.0,
    certificated_badge: 0,
    locations: ['인천 강화군', '인천 남동구'],
    img: null,
  },
];
export default function WorkerInfoList() {
  const [workerList, setWorkerList] = useState<any>(data);
  return (
    <>
      {workerList || workerList.length > 0 ? (
        <div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
