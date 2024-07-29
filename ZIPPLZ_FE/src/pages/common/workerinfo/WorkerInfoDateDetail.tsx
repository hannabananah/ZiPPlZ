import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function WorkerInfoDateDetail() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate('/WorkerInfoList', {
      state: {
        startDate,
        endDate,
      },
    });
  };

  const handleClose = () => {
    navigate('../WorkerInfoList'); // 우측 상단 x 클릭 시 이전 페이지로 돌아가기
  };

  return (
    <>
      <div className="flex justify-center items-start min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-3xl">
          <div className="flex justify-between items-center w-full">
            <div className="flex-1 text-center font-bold">시공 날짜 선택</div>
            <div className="ml-auto cursor-pointer" onClick={handleClose}>
              <IoIosClose size={40} />
            </div>
          </div>
          <div className="font-bold">시공이 필요한 날짜를 선택해주세요</div>
          <div className="text-zp-gray mb-4 font-bold">
            선택한 날짜에 작업이 가능한 시공업자를 검색할 수 있어요.
          </div>

          <div className="mb-4 flex justify-center">
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>

          <div className="flex justify-start mb-4">
            <div className="mr-2 font-bold">선택된 기간</div>
            <div className="text-zp-lg text-zp-gray">
              {startDate && endDate
                ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
                : '기간을 선택하세요'}
            </div>
          </div>

          <div className="font-bold h-20 flex items-center justify-center">
            <button
              onClick={handleConfirm}
              className="w-[550px] h-[38px] bg-zp-sub-color rounded-zp-radius-btn text-white zp-radius-btn"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
