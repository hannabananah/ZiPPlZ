import { useState } from 'react';
<<<<<<< HEAD
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function SchedulerCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardHeight: string = isOpen ? '7rem' : '4rem';
  const handleClickChevron = function () {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className="relative flex flex-col w-full justify-center items-center rounded-zp-radius-big bg-zp-white"
        style={{ height: cardHeight }}
=======
<<<<<<<< HEAD:ZIPPLZ_FE/src/components/scheduler/SchedulerCard.tsx
========
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
>>>>>>>> 00b2ca2 (FEAT: scheduler카드 & scheduler공유문서 디자인):ZIPPLZ_FE/src/components/scheduler/card/SchedulerCard.tsx

export default function SchedulerCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="flex flex-col justify-center items-center gap-6 bg-zp-light-beige"
      style={{ width: '37.5rem' }}
    >
      <div
<<<<<<<< HEAD:ZIPPLZ_FE/src/components/scheduler/SchedulerCard.tsx
        className="flex justify-between items-center px-6 rounded-zp-radius-btn bg-zp-white"
        style={{ width: '34.375rem', height: '4rem' }}
      >
        <div className="text-zp-xl font-bold">1.철거</div>
        <div>*</div>
========
        className="relative flex flex-col justify-center items-center rounded-zp-radius-big bg-zp-white"
        style={{ width: '34.375rem', height: cardHeight }}
>>>>>>> 00b2ca2 (FEAT: scheduler카드 & scheduler공유문서 디자인)
      >
        <div className="absolute top-5 flex justify-between items-center w-full px-6 ">
          <div className="flex items-center gap-1 text-zp-xl font-bold">
            1.철거 <IoMdCheckmarkCircleOutline size={16} color="#34C759" />
          </div>
          <div>
            {isOpen ? (
              <FaChevronUp
                className="cursor-pointer"
                size={16}
                onClick={handleClickChevron}
              />
            ) : (
              <FaChevronDown
                className="cursor-pointer"
                width={16}
                height={16}
                onClick={handleClickChevron}
              />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="flex flex-col items-center w-full mt-[2.5rem] gap-[0.75rem]">
<<<<<<< HEAD
            <hr className="w-full border-zp-light-gray" />
=======
            <hr className="w-[34.375rem] border-zp-light-gray" />
>>>>>>> 00b2ca2 (FEAT: scheduler카드 & scheduler공유문서 디자인)
            <FiPlusCircle
              className="cursor-pointer"
              size={32}
              onClick={() => alert('리스트추가')}
            />
          </div>
        )}
<<<<<<< HEAD
      </div>
    </>
=======
>>>>>>>> 00b2ca2 (FEAT: scheduler카드 & scheduler공유문서 디자인):ZIPPLZ_FE/src/components/scheduler/card/SchedulerCard.tsx
      </div>
      <div
        className="flex justify-between items-center px-6 rounded-zp-radius-btn bg-zp-white"
        style={{ width: '34.375rem', height: '4rem' }}
      >
        <div className="text-zp-xl font-bold">1.철거</div>
        <div>*</div>
      </div>
    </div>
>>>>>>> 00b2ca2 (FEAT: scheduler카드 & scheduler공유문서 디자인)
  );
}
