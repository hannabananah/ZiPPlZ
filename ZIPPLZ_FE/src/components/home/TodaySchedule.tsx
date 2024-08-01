import React from 'react';

export default function TodaySchedule() {
  return (
    <>
      <div className="relative w-full rounded-zp-radius-big p-6 flex flex-col gap-2 bg-zp-white">
        <div className="flex gap-4">
          <div className="bg-zp-main-color rounded-zp-radius-full w-4 aspect-square" />
          <p className="text-zp-lg font-bold">공정</p>
        </div>
        <p className="text-zp-3xs">시공기간: ~~~~</p>
      </div>
    </>
  );
}
