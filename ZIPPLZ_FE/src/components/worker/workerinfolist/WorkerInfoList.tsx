import { useEffect } from 'react';

import {
  getWorkerList,
  getWorkerListByField,
} from '@/apis/worker/WorkerListApi';
import WorkerInfoListItem from '@/components/worker/workerinfolist/WorkerInfoListItem';
import { useWorkerListStore } from '@/stores/workerListStore';

interface Props {
  field?: number;
  keyword: string;
  searchWorker: () => void;
}
export default function WorkerInfoList({
  field,
  keyword,
  searchWorker,
}: Props) {
  const { workerList, setWorkerList } = useWorkerListStore();
  const fetchWorkerList = async () => {
    const response = await getWorkerList();
    setWorkerList(response.data.data);
  };
  const fetchWorkerListByField = async (field: number) => {
    const response = getWorkerListByField(field);
    setWorkerList((await response).data.data);
  };

  useEffect(() => {
    if (field && field > 0) {
      if (keyword !== '') searchWorker();
      else fetchWorkerListByField(field);
    } else {
      if (keyword !== '') searchWorker();
      else fetchWorkerList();
    }
  }, [field]);
  console.log(field);
  return (
    <>
      {workerList && workerList.length > 0 ? (
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
