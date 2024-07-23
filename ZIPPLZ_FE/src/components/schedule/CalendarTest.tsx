import React, { useEffect } from 'react';
import { useState } from 'react';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

// 더미 데이터 타입 정의
interface Event {
  title: string;
  start: string;
  end?: string;
}

// 더미 데이터 생성
const dummyEvents: Event[] = [
  { title: 'Event 1', start: '2024-07-25', end: '2024-07-26' },
  { title: 'Event 2', start: '2024-07-26', end: '2024-07-27' },
  { title: 'Event 3', start: '2024-07-27', end: '2024-07-28' },
  { title: 'Event 4', start: '2024-07-28', end: '2024-07-29' },
];

const CalendarTest: React.FC = function () {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [eventsOnDate, setEventsOnDate] = useState<Event[]>([]);

  const handleDateClick = function (info: { dateStr: string }) {
    const clickedDate = info.dateStr;

    const filteredEvents = dummyEvents.filter(
      (event) =>
        new Date(event.start).toISOString().split('T')[0] === clickedDate
    );

    setSelectedDate(clickedDate);
    setEventsOnDate(filteredEvents);
    setShowModal(true);
  };
  useEffect(() => {
    console.log(eventsOnDate);
  }, [eventsOnDate]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        FullCalendar with Dummy Events
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={dummyEvents.map((event) => ({
          title: event.title,
          start: event.start,
          end: event.end,
        }))}
        dateClick={handleDateClick}
      />

      {/* 모달 표시 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg w-80">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Events on {selectedDate}
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              {eventsOnDate.length > 0 ? (
                <ul className="list-disc pl-5">
                  {eventsOnDate.map((event, index) => (
                    <li key={index} className="mb-2">
                      {event.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No events on this day.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CalendarTest;
