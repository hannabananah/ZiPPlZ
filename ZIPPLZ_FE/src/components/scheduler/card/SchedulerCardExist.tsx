import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

import Button from '@/components/common/Button';

export default function SchedulerCardExist() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
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
            1.철거 <IoMdCheckmarkCircleOutline size={16} color="#34C759" />
            {isOpen && !isUpdate ? (
              <>
                <FaPencilAlt
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setIsUpdate(!isUpdate)}
                ></FaPencilAlt>
                <FaRegTrashAlt
                  size={16}
                  className="cursor-pointer"
                  onClick={() => alert('삭제')}
                ></FaRegTrashAlt>
              </>
            ) : (
              <></>
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
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-[3rem] h-[3rem] text-center border rounded-zp-radius-full">
                  이미지
                </div>
                <p className="text-zp-xs font-bold">시공자 이름</p>
                <p className="text-zp-xs font-bold">시공자 업체명</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-zp-xs font-bold">기간</p>
                <p className="text-zp-xs font-bold">사용 자재</p>
                <p className="text-zp-xs font-bold">시공 비용</p>
                <p className="text-zp-xs font-bold">메모</p>
                {isUpdate ? (
                  <div className=" min-w-[168px] max-w-[19rem] h-[3.5rem] border border-zp-light-gray rounded-zp-radius-big text-zp-2xs">
                    인풋 너어야 함
                  </div>
                ) : (
                  <div className="max-w-[19rem] h-[3.5rem] border border-zp-light-gray rounded-zp-radius-big text-zp-2xs">
                    메모 내용
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
                      onClick={() => setIsUpdate(!isUpdate)}
                    />
                  ) : (
                    <>
                      <Button
                        children="프로필 보기"
                        buttonType="normal"
                        width={5}
                        height={1.5}
                        radius="big"
                        fontSize="2xs"
                      />
                      <Button
                        children="문의하기"
                        buttonType="normal"
                        width={5}
                        height={1.5}
                        radius="big"
                        fontSize="2xs"
                      />
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
