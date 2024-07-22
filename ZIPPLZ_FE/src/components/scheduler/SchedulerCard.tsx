import { useState } from 'react';

export default function SchedulerCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="flex flex-col justify-center items-center gap-6 bg-zp-light-beige"
      style={{ width: '37.5rem' }}
    >
      <div
        className="flex justify-between items-center px-6 rounded-zp-radius-btn bg-zp-white"
        style={{ width: '34.375rem', height: '4rem' }}
      >
        <div className="text-zp-xl font-bold">1.철거</div>
        <div>*</div>
      </div>
      <div
        className="flex justify-between items-center px-6 rounded-zp-radius-btn bg-zp-white"
        style={{ width: '34.375rem', height: '4rem' }}
      >
        <div className="text-zp-xl font-bold">1.철거</div>
        <div>*</div>
      </div>
    </div>
  );
}
