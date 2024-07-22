import { useState } from 'react';

import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
  ScheduleCheckerIcon,
} from '@/assets/svg/icons';

export default function SchedulerCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardHeight: string = isOpen ? '7rem' : '4rem';
  const handleClickChevron = function () {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className="flex flex-col justify-center items-center rounded-zp-radius-big bg-zp-white gap-4"
        style={{ width: '34.375rem', height: cardHeight }}
      >
        <div className="flex justify-between items-center w-full px-6 ">
          <div className="flex items-center gap-4 text-zp-xl font-bold">
            1.철거 <ScheduleCheckerIcon width={16} height={16} />
          </div>
          <div>
            {isOpen ? (
              <ChevronUpIcon
                className="cursor-pointer"
                width={16}
                height={16}
                onClick={handleClickChevron}
              />
            ) : (
              <ChevronDownIcon
                className="cursor-pointer"
                width={16}
                height={16}
                onClick={handleClickChevron}
              />
            )}
          </div>
        </div>
        {isOpen && (
          <>
            <hr className="w-full border-zp-light-gray" />
            <PlusCircleIcon
              className="cursor-pointer"
              width={32}
              height={32}
              onClick={() => alert('리스트추가')}
            />
          </>
        )}
      </div>
    </>
  );
}
