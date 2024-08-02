import Button from '../common/Button';

export default function TodaySchedule() {
  return (
    <>
      <div className="relative w-full h-[8.3rem] rounded-zp-radius-big sm: p-4 md:p-6 flex flex-col gap-4 bg-zp-white">
        <div className="flex justify-between items-start md:px-2">
          <div className="flex flex-col ">
            <div className="flex gap-1 items-center">
              <div className="bg-zp-main-color rounded-zp-radius-full w-4 h-4" />
              <p className="text-zp-sm font-bold">공정</p>
            </div>
            <p className="text-zp-3xs">시공기간: ~~~~</p>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="bg-zp-main-color w-[80%] aspect-square rounded-zp-radius-full"></div>
            <p className="text-zp-2xs">시공자 이름</p>
          </div>
        </div>
        <div className="w-full gap-4 grid grid-cols-2 ">
          <Button
            buttonType="normal"
            children="자재보기"
            width="full"
            height={1.5}
            fontSize="2xs"
            radius="btn"
          />
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
