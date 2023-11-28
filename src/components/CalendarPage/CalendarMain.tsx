import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarMain.css";

interface Event {
  id: number;
  date: Date;
  title: string;
}

const CalendarMain: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventName, setEventName] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);

  const Date_Click_Fun = (date: Date) => {
    setSelectedDate(date);
  };

  const Event_Data_Update = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  };

  const Create_Event_Fun = () => {
    if (selectedDate && eventName) {
      const newEvent: Event = {
        id: new Date().getTime(),
        date: selectedDate,
        title: eventName,
      };
      setEvents([...events, newEvent]);
      setSelectedDate(null);
      setEventName("");
      setSelectedDate(newEvent.date);
    }
  };

  const Update_Event_Fun = (eventId: number, newName: string) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          title: newName,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const Delete_Event_Fun = (eventId: number) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="CalendarMain">
      <h1>Manage Events Calendar</h1>
      <div className="container">
        <div className="calendar-container">
          <Calendar
            value={selectedDate}
            onClickDay={Date_Click_Fun}
            tileClassName={({ date }: { date: Date }) =>
              selectedDate &&
              date.toDateString() === selectedDate.toDateString()
                ? "selected"
                : events.some(
                    (event) => event.date.toDateString() === date.toDateString()
                  )
                ? "event-marked"
                : ""
            }
          />
        </div>
        <div className="event-container">
          {selectedDate && (
            <div className="event-form">
              <h2>Create Event</h2>
              <p>Selected Date: {selectedDate.toDateString()}</p>
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={Event_Data_Update}
              />
              <button className="create-btn" onClick={Create_Event_Fun}>
                Click Here to Add Event
              </button>
            </div>
          )}
          {events.length > 0 && selectedDate && (
            <div className="event-list">
              <h2>My Created Event List</h2>
              <div className="event-cards">
                {events.map((event) =>
                  event.date.toDateString() === selectedDate.toDateString() ? (
                    <div key={event.id} className="event-card">
                      <div className="event-card-header">
                        <span className="event-date">
                          {event.date.toDateString()}
                        </span>
                        <div className="event-actions">
                          <button
                            className="update-btn"
                            onClick={() =>
                              Update_Event_Fun(
                                event.id,
                                prompt("ENTER NEW TITLE") || ""
                              )
                            }
                          >
                            Update Event
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => Delete_Event_Fun(event.id)}
                          >
                            Delete Event
                          </button>
                        </div>
                      </div>
                      <div className="event-card-body">
                        <p className="event-title">{event.title}</p>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarMain;
