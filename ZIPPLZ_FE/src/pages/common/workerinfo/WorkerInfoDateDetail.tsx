import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function WorkerInfoDateDetail() {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (dateRange) {
      navigate('/WorkerInfoList', {
        state: {
          startDate: dateRange[0],
          endDate: dateRange[1],
        },
      });
    }
  };

  const handleClose = () => {
    navigate('../WorkerInfoList');
  };

  return (
    <div className="flex justify-center items-start p-6">
      <div className="w-full">
        {/* 시공 날짜 선택 text + 닫기 버튼 */}
        <div className="flex justify-between items-center w-full">
          <div className="flex-1 relative left-4 text-center font-bold">
            시공 날짜 선택
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <IoIosClose size={40} />
          </div>
        </div>
        {/* text */}
        <div className="mt-6 font-bold">시공이 필요한 날짜를 선택해주세요</div>
        <div className="text-zp-gray mb-4 font-bold text-zp-xs">
          선택한 날짜에 작업이 가능한 시공업자를 검색할 수 있어요.
        </div>

        {/* 달력 */}
        <div className="mt-6 flex justify-center">
          <Calendar
            selectRange
            onChange={(range) => setDateRange(range as [Date, Date])}
            value={dateRange}
            className="react-calendar w-full h-[450px] border-none bg-zp-transparent text-zp-2xl"
            formatDay={(locale, date) => date.getDate().toString()} // "일" 텍스트 제거
          />
        </div>

        {/* 선택된 기간 표시 */}
        <div className="flex items-center justify-start">
          <div className="font-bold">선택된 기간</div>
          <div className="pl-4 text-zp-lg text-zp-gray font-bold">
            {dateRange
              ? `${dateRange[0].toLocaleDateString()} ~ ${dateRange[1].toLocaleDateString()}`
              : '기간을 선택하세요'}
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className="mt-6 font-bold flex items-center justify-center">
          <button
            onClick={handleConfirm}
            className="w-full h-10 bg-zp-sub-color rounded-zp-radius-btn text-white zp-radius-btn"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
