import Button from '../common/Button';

interface Props {
  role: string;
  work?: any;
}
export default function TodaySchedule({ role }: Props) {
  return (
    <>
      <div className="relative w-full h-[8.3rem] rounded-zp-radius-big sm: p-4 md:p-6 flex flex-col gap-4 bg-zp-white">
        <div className="flex items-start justify-between md:px-2">
          <div className="flex flex-col ">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-zp-main-color rounded-zp-radius-full" />
              <p className="font-bold text-zp-sm">공정</p>
            </div>
            <p className="text-zp-3xs">시공기간: ~~~~</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-zp-main-color w-[80%] aspect-square rounded-zp-radius-full"></div>
            <p className="text-zp-2xs">시공자 이름</p>
          </div>
        </div>
        <div className="w-full ">
          <Button
            buttonType="normal"
            children="채팅하기"
            width="full"
            height={1.5}
            fontSize="2xs"
            radius="btn"
          />
        </div>
      </div>
    </>
  );
}
