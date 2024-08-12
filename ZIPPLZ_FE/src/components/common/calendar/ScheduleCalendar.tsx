import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import './Calendar.css';

interface Work {
  starDate: string;
  endDate: string;
  field: string;
}
// 더미 데이터 타입 정의
interface Event {
  title: string;
  start: Date;
  end: Date;
}
interface Props {
  workList: any | Work[];
}
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const ScheduleCalendar = function ({ workList }: Props) {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState<Event[]>([]);
  useEffect(() => {
    if (Array.isArray(workList)) {
      const isWorkArray = workList.every(
        (item) => 'startDate' in item && 'endDate' in item && 'field' in item
      );

      const newEventList: Event[] = workList
        .filter((work: any) => work !== null && work !== undefined)
        .map((work: any) => ({
          title: isWorkArray ? work.field : work.fieldCode.fieldName,
          start: new Date(work.startDate),
          end: new Date(work.endDate),
        }));
      setEventList(newEventList);
    }
  }, [workList]);
  return (
    <div className="relative w-full">
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
        events={eventList.map((event) => {
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
export default ScheduleCalendar;
