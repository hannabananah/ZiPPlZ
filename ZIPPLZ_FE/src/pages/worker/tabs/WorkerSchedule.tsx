import { useEffect, useState } from 'react';
import { LuMaximize2 } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

import {
  getWorkerSchedule,
  getWorkerScheduleDetail,
} from '@/apis/worker/PortfolioApi';
import { useLoginUserStore } from '@/stores/loginUserStore';
import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import TodaySchedule from '@components/home/TodaySchedule';
import { WorkerDate, usePortfolioStore } from '@stores/portfolioStore';

interface Props {
  workerSerial?: number;
}
export default function WorkerSchedule({ workerSerial }: Props) {
  const { dateList, setDateList, dateDetail, setDateDetail } =
    usePortfolioStore();
  const { id } = useParams<{ id: string }>();
  const { loginUser } = useLoginUserStore();
  const [selectedWorkSerial, setSelectedWorkSerial] = useState<number | null>(
    null
  );
  const fetchWorkerSchedule = async (workerSerial: number) => {
    const response = await getWorkerSchedule(workerSerial);
    setDateList(response.data.data);
  };
  const fetchWorkerScheduleDetail = async (
    workerSerial: number,
    workSerial: number
  ) => {
    const response = await getWorkerScheduleDetail(workerSerial, workSerial);
    setDateDetail(response.data.data);
  };
  useEffect(() => {
    if (workerSerial) fetchWorkerSchedule(workerSerial);
    const storedWorkSerial = localStorage.getItem('workSerial');
    if (storedWorkSerial) {
      setSelectedWorkSerial(parseInt(storedWorkSerial, 10));
    }
  }, []);
  useEffect(() => {
    if (workerSerial && selectedWorkSerial !== null)
      fetchWorkerScheduleDetail(workerSerial, selectedWorkSerial);
  }, [selectedWorkSerial]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <ScheduleCalendar
          workList={dateList.map((item: WorkerDate) => ({
            workSerial: item.workSerial,
            title: item.fieldName,
            start: item.startDate,
            end: item.endDate,
          }))}
        />
        {id && parseInt(id) === loginUser?.userSerial && dateDetail && (
          <>
            <div className="w-full h-[8.3rem] grid grid-cols-2 gap-4">
              <TodaySchedule role="worker" work={dateDetail} />
              <div className="relative flex flex-col justify-center w-full h-full gap-4 p-6 bg-zp-white rounded-zp-radius-big">
                <div className="flex w-full gap-2">
                  {dateDetail.planImageList.length > 0 &&
                    dateDetail.planImageList.map((img) => (
                      <img
                        className="w-[30%] aspect-square border"
                        src={img.saveFile}
                      />
                    ))}
                </div>
                <p className="text-zp-xs line-clamp-1">
                  {dateDetail.sharedContents}
                </p>
                <LuMaximize2
                  className="absolute top-[10%] right-[5%] cursor-pointer"
                  size="8%"
                  // onClick={openModal}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
