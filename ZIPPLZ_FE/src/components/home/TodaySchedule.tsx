import { useNavigate } from 'react-router-dom';

import type { ChatRoom } from '@/types';
import { formatDate } from '@/utils/formatDateWithTime';

import Button from '../common/Button';

interface Props {
  role: string;
  work?: any;
  chatRoomList: ChatRoom[];
}
export default function TodaySchedule({ role, work, chatRoomList }: Props) {
  const navigate = useNavigate();
  const chatStart = () => {
    if (chatRoomList.length > 0 && work) {
      const chatRoomSerial: string = chatRoomList.filter(
        (room) =>
          room.fieldName === work.field &&
          room.workerName === work.worker.userSerial.userName &&
          room.customerName === work.customer.userSerial.userName
      )[0].chatroomSerial;
      navigate(`/chatrooms/${chatRoomSerial}`);
    }
  };
  return (
    <>
      {work && (
        <div className="relative w-full h-[8.3rem] rounded-zp-radius-big sm: p-4 md:p-6 flex flex-col gap-4 bg-zp-white drop-shadow-zp-slight">
          <div className="flex items-start justify-between md:px-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-zp-main-color rounded-zp-radius-full" />
                <p className="font-bold text-zp-sm ">
                  {role === 'customer' ? work.field : work.customer.nickname}
                </p>
              </div>
              <p className="text-zp-3xs ">
                시공기간: {formatDate(work.startDate)}~
                {formatDate(work.endDate)}
              </p>
              {role === 'worker' && (
                <p className="text-zp-3xs">{work.address}</p>
              )}
            </div>
            {role === 'customer' && (
              <div className="flex flex-col items-center gap-1">
                <img
                  className="object-cover w-[50%] aspect-square rounded-zp-radius-full"
                  src={work.worker.userSerial.fileSerial?.saveFile}
                />
                <p className="font-bold text-zp-2xs">
                  {work.worker.userSerial.userName}
                </p>
              </div>
            )}
          </div>
          <div className="grid w-full grid-cols-2 gap-4 ">
            <Button
              buttonType="normal"
              children="채팅하기"
              width="full"
              height={1.5}
              fontSize="2xs"
              radius="btn"
              onClick={chatStart}
            />
            <Button
              buttonType="normal"
              children="계약서"
              width="full"
              height={1.5}
              fontSize="2xs"
              radius="btn"
              onClick={() => navigate(`/contract/${work.workSerial}`)}
            />
          </div>
        </div>
      )}
    </>
  );
}
