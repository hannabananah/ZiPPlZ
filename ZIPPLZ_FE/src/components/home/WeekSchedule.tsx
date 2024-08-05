interface Schedule {
  field: string;
  date: string;
}
const list: Schedule[] = [
  { field: '샷시', date: '24/08/02' },
  { field: '샷시', date: '24/08/02' },
  { field: '샷시', date: '24/08/02' },
  { field: '샷시', date: '24/08/02' },
  { field: '샷시', date: '24/08/02' },
  { field: '샷시', date: '24/08/02' },
];
export default function WeekSchedule() {
  return (
    <>
      <div className="relative w-full h-[8.3rem] rounded-zp-radius-big sm: p-4 md:p-6 flex flex-col gap-4 bg-zp-white">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div className="flex justify-between items-start">
              <div className="flex flex-col ">
                <div className="flex gap-2 items-center">
                  <div className="bg-zp-sub-color rounded-zp-radius-full w-2 h-2" />
                  <p className="text-zp-2xs font-bold">{list[idx].field}</p>
                </div>
              </div>
              <p className="text-zp-3xs">{list[idx].date}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-zp-2xs font-extrabold">{list.length - 3}</span>
          <span className="text-zp-3xs">개의 시공이 남았어요</span>
        </div>
      </div>
    </>
  );
}
