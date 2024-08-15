import { useEffect, useState } from 'react';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import './Calendar.css';

interface Work {
  workSerial?: number;
  startDate: string;
  endDate: string;
  field: string;
}
// 더미 데이터 타입 정의
interface Event {
  title: string;
  start: Date;
  end: Date;
  workSerial?: number;
}
interface Props {
  workList: any | Work[];
  onEventClick?: (workSerial: string) => void;
}
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const ScheduleCalendar = function ({ workList, onEventClick }: Props) {
  useEffect(() => {
    console.log(workList);
  }, []);
  const [eventList, setEventList] = useState<Event[]>([]);
  useEffect(() => {
    if (Array.isArray(workList)) {
      const newEventList: Event[] = workList
        .filter((work: any) => work !== null && work !== undefined)
        .map((work: any) => ({
          title: work.field,
          start: new Date(work.startDate),
          end: new Date(work.endDate),
          workSerial: work.workSerial,
        }));

      setEventList(newEventList); // 새로 생성된 eventList를 상태로 설정
    }
  }, [workList]);
  return (
    <div className="relative w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        timeZone="UTC"
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
              backgroundColor: randomColor, //  extendedProps를 사용하여 색상 전달
              workSerial: event.workSerial,
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
          if (event.event.extendedProps.workSerial) {
            localStorage.setItem(
              'workSerial',
              event.event.extendedProps.workSerial
            );
            if (onEventClick)
              onEventClick(event.event.extendedProps.workSerial);
          }
        }}
      />
    </div>
  );
};
export default ScheduleCalendar;
