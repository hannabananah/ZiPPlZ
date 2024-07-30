import { useNavigate } from 'react-router-dom';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import './Calendar.css';

// 더미 데이터 타입 정의
interface Event {
  title: string;
  start: Date;
  end: Date;
}

// 더미 데이터 생성
const dummyEvents: Event[] = [
  {
    title: 'Event 1',
    start: new Date(2024, 6, 25),
    end: new Date(2024, 6, 29),
  },
  {
    title: 'Event 2',
    start: new Date(2024, 6, 26),
    end: new Date(2024, 6, 29),
  },
  {
    title: 'Event 3',
    start: new Date(2024, 6, 27),
    end: new Date(2024, 6, 29),
  },
  {
    title: 'Event 4',
    start: new Date(2024, 6, 28),
    end: new Date(2024, 6, 29),
  },
];
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const CalendarTest: React.FC = function () {
  const navigate = useNavigate();
  return (
    <div className="relative w-full">
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-zp-yellow bg-opacity-0 z-1000 cursor-pointer w-[7rem] h-[2rem]"
        onClick={() => navigate('/schedule')}
      ></div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        timeZone="UTC"
        customButtons={{
          customTitle: {
            text: 'titl',
            click: () => navigate('/schedule'),
          },
        }}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        aspectRatio={1.3}
        eventBorderColor="none"
        initialView="dayGridMonth"
        dayMaxEvents={true}
        events={dummyEvents.map((event) => {
          const adjustedEnd = new Date(event.end);
          adjustedEnd.setDate(adjustedEnd.getDate() + 1);

          const randomColor = getRandomColor(); // 랜덤 색상 생성

          return {
            title: event.title,
            start: event.start.toISOString(),
            end: adjustedEnd.toISOString(),
            extendedProps: {
              backgroundColor: randomColor, // extendedProps를 사용하여 색상 전달
            },
          };
        })}
        eventContent={(eventInfo) => (
          <div
            className="p-1 text-zp-white text-zp-xl rounded-zp-radius-btn "
            style={{
              backgroundColor: eventInfo.event.extendedProps.backgroundColor,
            }}
          >
            {eventInfo.event.title}
          </div>
        )}
        eventClick={(event) => {
          navigate('/schedule');
          console.log(event.jsEvent.target);
        }}
      />
    </div>
  );
};
export default CalendarTest;
