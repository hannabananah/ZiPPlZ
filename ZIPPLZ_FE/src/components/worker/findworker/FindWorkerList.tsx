import { useEffect } from 'react';

import { getFindWorkerList } from '@/apis/worker/WorkerListApi';
import { FindWorker, useWorkerListStore } from '@stores/workerListStore';

import FindWorkerListItem from './FindWorkerListItem';

export default function FindWorkerList() {
  const { findWorkerList, setFindWorkerList } = useWorkerListStore();
  const fetchFindWorkerList = async () => {
    const response = await getFindWorkerList();
    setFindWorkerList(response.data.data);
  };
  useEffect(() => {
    if (!findWorkerList) fetchFindWorkerList();
  }, []);
  return (
    <div className="flex flex-col gap-6 mb-[6rem] overflow-auto">
      {findWorkerList &&
        findWorkerList.map((item: FindWorker) => (
          <FindWorkerListItem board={item} />
        ))}
    </div>
  );
}
