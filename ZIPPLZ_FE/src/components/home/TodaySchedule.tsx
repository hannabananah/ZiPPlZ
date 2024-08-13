import { formatDate } from '@/utils/formatDateWithTime';

import Button from '../common/Button';

interface Props {
  role: string;
  work?: any;
}
export default function TodaySchedule({ role, work }: Props) {
  return (
    <>
      {work ? (
        <div className="relative w-full h-[8.3rem] rounded-zp-radius-big sm: p-4 md:p-6 flex flex-col gap-4 bg-zp-white">
          <div className="flex items-start justify-between md:px-2">
            <div className="flex flex-col ">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-zp-main-color rounded-zp-radius-full" />
                <p className="font-bold text-zp-sm">
                  {role === 'customer' ? '공정' : work.nickname}
                </p>
              </div>
              <p className="text-zp-3xs">
                시공기간: {formatDate(work.startDate)}~
                {formatDate(work.endDate)}
              </p>
              {role === 'worker' && (
                <p className="text-zp-3xs">{work.address}</p>
              )}
            </div>
            {role === 'customer' && (
              <div className="flex flex-col items-center gap-1">
                <div className="bg-zp-main-color w-[80%] aspect-square rounded-zp-radius-full"></div>
                <p className="text-zp-2xs">시공자 이름</p>
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
            />
            <Button
              buttonType="normal"
              children="계약서"
              width="full"
              height={1.5}
              fontSize="2xs"
              radius="btn"
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[8.3rem] rounded-zp-radius-big sm: p-4 md:p-6 flex flex-col gap-4 bg-zp-white justify-center items-center">
          <p className="font-bold">시공이 없습니다.</p>
        </div>
      )}
    </>
  );
}
