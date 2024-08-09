import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

interface Props {
  schedule: any;
  idx: number;
  onClickTrash: () => void;
}
export default function SchedulerCard({ schedule, idx, onClickTrash }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cardHeight: string = isOpen ? '7rem' : '4rem';
  const handleClickChevron = function () {
    console.log(schedule.workSerial);
    setIsOpen(!isOpen);
  };

  const handleClickTrash = () => {
    if (onClickTrash) {
      onClickTrash();
    }
  };

  return (
    <>
      <div
        className="relative flex flex-col w-full justify-center items-center rounded-zp-radius-big bg-zp-white"
        style={{ height: cardHeight }}
      >
        <div className="absolute top-5 flex justify-between items-center w-full px-6 ">
          <div className="flex items-center gap-1 text-zp-xl font-bold">
            {idx} {schedule.fieldName}
            {isOpen && (
              <FaRegTrashAlt
                size={16}
                className="cursor-pointer"
                onClick={() => handleClickTrash()}
              />
            )}
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
            <hr className="w-full border-zp-light-gray" />
            <FiPlusCircle
              className="cursor-pointer"
              size={32}
              onClick={() => alert('리스트추가')}
            />
          </div>
        )}
      </div>
    </>
  );
}
