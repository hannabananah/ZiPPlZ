import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getChatRooms } from '@/apis/chatroom/chatApi';
import { getTopWorkerList } from '@/apis/worker/WorkerListApi';
import { useWorkerListStore } from '@/stores/workerListStore';
import { getTodayWork, getWorksByUser } from '@apis/scheduler/schedulerApi';
import Button from '@components/common/Button';
import ScheduleCalendar from '@components/common/calendar/ScheduleCalendar';
import FieldListItem from '@components/home/FieldListItem';
import ImageChangeTab from '@components/home/ImageChangeTab';
import ImageChangeViewTab from '@components/home/ImageChangeViewTab';
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

interface Work {
  starDate: string;
  endDate: string;
  field: string;
}
interface TodayWork {
  workSerial: number;
  startDate: string;
  endDate: string;
  field: string;
  address: string;
  workerProfile: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  };
  customerProfile: string;
  customer: {
    customerSerial: number;
    userSerial: {
      userSerial: number;
      fileSerial: number;
      email: string;
      password: string;
      userName: string;
      birthDate: string;
      tel: string;
      delYN: number;
      role: string;
    };
    nickname: string;
    currentAddress: string | null;
  };
  worker: {
    workerSerial: number;
    userSerial: {
      userSerial: number;
      fileSerial: {
        fileSerial: number;
        saveFolder: string;
        originalFile: string;
        saveFile: string;
        fileName: string | null;
      };
      email: string;
      password: string;
      userName: string;
      birthDate: string;
      tel: string;
      delYN: number;
      role: string;
    };
    company: string;
    companyAddress: string;
    businessNumber: string;
    hasAsBadge: number;
    certificatedBadge: number;
  };
}
interface ChatRoom {
  chatroomSerial: string;
  lastMessage: string;
  fieldName: string;
  workerName: string;
  customerName: string;
  temperature: number;
  createdAt: string;
  unreadCount: number;
  certificated: boolean;
  file: {
    fileSerial: number;
    saveFolder: string;
    originalFile: string;
    saveFile: string;
    fileName: string;
  };
}
export default function Home() {
  const [scheduleList, setScheduleList] = useState<Work[]>([]);
  const [todayWork, setTodayWork] = useState<TodayWork[]>([]);
  const navigate = useNavigate();
  const { loginUser } = useLoginUserStore();
  const { workerList, setWorkerList } = useWorkerListStore();
  const [chatRoomList, setChatRoomList] = useState<ChatRoom[]>([]);
  const fetchChatRooms = async () => {
    const response = await getChatRooms();
    setChatRoomList(response.data.data);
  };
  useEffect(() => {
    fetchChatRooms();
  }, []);
  const handleClickImageChange = () =>
    (window.location.href = `http://localhost:8080?user=${loginUser?.userSerial}`);
  const fetchWorks = async () => {
    const response = await getWorksByUser();
    setScheduleList(response.data.data);
  };
  const handleClickField = (field: string) => {
    navigate(`/workers/portfolios?type=${field}`);
  };
  const fetchHotWorkers = async () => {
    const response = await getTopWorkerList();
    setWorkerList(response.data.data);
  };
  const fetchTodaySchedule = async () => {
    try {
      const response = await getTodayWork();
      setTodayWork(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchHotWorkers();
    if (loginUser?.role) {
      fetchWorks();
      fetchTodaySchedule();
    }
  }, []);
  return (
    <div className="flex flex-col gap-6 mt-8 mb-6 overflow-auto bg-zp-light-beige p-7">
      <div className="relative w-full p-4 rounded-zp-radius-big bg-zp-white">
        <ScheduleCalendar workList={scheduleList} />
        {(!loginUser || loginUser.role === '') && (
          <div className="absolute flex justify-center items-center w-full h-full top-0 left-0 rounded-zp-radius-big bg-[rgba(255,255,255,0.5)] z-10">
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
            {todayWork && todayWork.length > 0 ? (
              todayWork
                .filter((work) => work.worker !== null)
                .map((work) => (
                  <TodaySchedule
                    key={work.workSerial}
                    role={loginUser?.role || ''}
                    work={work}
                    chatRoomList={chatRoomList}
                  />
                ))
            ) : (
              <div className="w-full h-[8.3rem] rounded-zp-radius-big bg-zp-white flex items-center justify-center">
                <p className="font-bold text-zp-md text-zp-light-gray">
                  시공이 없습니다
                </p>
              </div>
            )}
          </div>
          <div className="basis-5/12">
            <p className="font-extrabold text-zp-xl">Image Change</p>
            <div className="flex flex-col gap-2">
              <ImageChangeTab onClick={handleClickImageChange} />
              <ImageChangeViewTab
                onClick={() =>
                  navigate(`my-change-image/${loginUser.userSerial}`)
                }
              />
            </div>
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
            key={item}
            field={item}
            handleClickField={() => handleClickField(item)}
          />
        ))}
      </div>
      <p className="font-extrabold text-zp-xl">HOT한 시공업자</p>
      <div
        className="flex w-full overflow-x-auto"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <div className="flex justify-between w-full h-[8rem] ">
          {workerList?.map((worker) => (
            <WorkerCard key={worker.field_id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
  );
}
