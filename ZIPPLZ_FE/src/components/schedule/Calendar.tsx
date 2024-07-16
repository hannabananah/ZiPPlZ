import { useState } from 'react';

import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core';
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { INITIAL_EVENTS, createEventId } from '@utils/CalendarEvent';

export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('새로운 시공일정을 이곳에 입력해주세요.');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`'${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b className="mr-1">{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  };

  const renderSidebarEvent = (event: EventApi) => {
    return (
      <li key={event.id} className="mb-6">
        <b>
          {formatDate(event.start!, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </b>
        <i className="ml-1">{event.title}</i>
      </li>
    );
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="p-8 bg-blue-100 border-r border-blue-200 w-80">
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold">Instructions</h2>
          <ul className="pl-4 list-disc">
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
              className="mr-2"
            />
            <span className="text-sm">toggle weekends</span>
          </label>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold">
            All Events ({currentEvents.length})
          </h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
      <div className="flex-1 p-12">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          locale={koLocale}
        />
      </div>
    </div>
  );
}
