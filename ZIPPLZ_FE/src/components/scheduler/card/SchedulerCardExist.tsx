import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import { CertificatedBadge } from '@assets/svg/icons';
import Button from '@components/common/Button';

interface Props {
  schedule: any;
  idx: number;
  planSerial?: number;
  updateContent: (serial: number, content: string) => void;
}
export default function SchedulerCardExist({
  schedule,
  idx,
  updateContent,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(schedule.workContent);
  const cardHeight: string = isOpen ? '18rem' : '4rem';
  const handleClickChevron = function () {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className="w-full relative flex flex-col justify-center items-center rounded-zp-radius-big bg-zp-white gap-4"
        style={{ height: cardHeight }}
      >
        <div className="absolute top-5 flex justify-between items-center w-full px-6 ">
          <div className="flex items-center gap-1.5 text-zp-xl font-bold">
            {idx}. {schedule.fieldName}{' '}
            {schedule.isCompleted > 0 && (
              <IoMdCheckmarkCircleOutline size={16} color="#34C759" />
            )}
            {isOpen && !isUpdate && (
              <>
                <FaPencilAlt
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIsUpdate(!isUpdate)}
                />
                <FaRegTrashAlt
                  size={16}
                  className="cursor-pointer"
                  onClick={() => alert('삭제')}
                />
              </>
            )}
          </div>
          <div>
            {isOpen ? (
              !isUpdate && (
                <FaChevronUp
                  className="cursor-pointer"
                  size={16}
                  onClick={handleClickChevron}
                />
              )
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
          <div className="flex flex-col w-full items-center  gap-4 mt-[1rem]">
            <hr className="w-full border-zp-light-gray" />
            <div className="flex w-full items-start">
              <div className="flex w-[30%] flex-col items-center gap-2">
                <div className="w-[60%] aspect-square text-center border rounded-zp-radius-full" />
                <div className="flex gap-1">
                  <p className="text-zp-2xs font-bold">
                    {schedule.workerSerial.userSerial.userName}
                  </p>
                  {schedule.workerSerial.certificate > 0 && (
                    <CertificatedBadge width={12} height={12} />
                  )}
                </div>
                <p className="text-zp-2xs font-bold">
                  {schedule.workerSerial.company}
                </p>
              </div>
              <div className="flex flex-col w-[80%] gap-1 pr-4">
                <p className="text-zp-2xs font-bold">
                  기간 : {schedule.startDate} ~ {schedule.endDate}
                </p>
                <p className="text-zp-2xs font-bold">
                  시공 비용 : {schedule.workPrice}
                </p>
                <p className="text-zp-2xs font-bold">메모</p>
                {isUpdate ? (
                  <textarea
                    className=" w-[70%] h-[3.5rem] border p-4 border-zp-light-gray rounded-zp-radius-big text-zp-2xs"
                    value={newContent}
                    onChange={(e: React.ChangeEvent) => {
                      setNewContent((e.target as HTMLInputElement).value);
                    }}
                    placeholder="작업 메모사항을 적어주세요."
                  />
                ) : (
                  <div className="max-w-[19rem] h-[3.5rem] border border-zp-light-gray rounded-zp-radius-big text-zp-2xs p-1">
                    {schedule.workContent}
                  </div>
                )}
                <div className="flex gap-2">
                  {isUpdate ? (
                    <Button
                      children="수정"
                      buttonType="normal"
                      width={5}
                      height={1.5}
                      radius="big"
                      fontSize="2xs"
                      onClick={() => {
                        setIsUpdate(!isUpdate);
                        updateContent(schedule.workSerial, newContent);
                      }}
                    />
                  ) : (
                    <>
                      <Button
                        children="문의하기"
                        buttonType="normal"
                        width={4}
                        height={1.5}
                        radius="big"
                        fontSize="2xs"
                      />
                      <Button
                        children="계약서"
                        buttonType="normal"
                        width={4}
                        height={1.5}
                        radius="big"
                        fontSize="2xs"
                      />
                      {schedule.isCompleted === 1 && (
                        <Button
                          children="평가하기"
                          buttonType="normal"
                          width={4}
                          height={1.5}
                          radius="big"
                          fontSize="2xs"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
