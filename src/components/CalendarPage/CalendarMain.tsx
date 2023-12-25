import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

interface EventData {
  eventName: string;
  eventId: string;
  type: BadgeProps["status"];
  //
}

const fetchEventsFromFirestore = async (
  month: Dayjs,
  setData: React.Dispatch<React.SetStateAction<Record<string, EventData[]>>>
) => {
  try {
    const startOfMonth = month.startOf("month").format("YYYY-MM-DD");
    const endOfMonth = month.endOf("month").format("YYYY-MM-DD");
    const eventsRef = collection(db, "Event");
    const q = query(
      eventsRef,
      where("eventDate", ">=", startOfMonth),
      where("eventDate", "<=", endOfMonth)
    );
    const querySnapshot = await getDocs(q);

    const eventData: Record<string, EventData[]> = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const eventDate = dayjs(data.eventDate);
      const dateStr = eventDate.format("YYYY-MM-DD");

      if (!eventData[dateStr]) {
        eventData[dateStr] = [];
      }

      eventData[dateStr].push({
        eventName: data.eventName,
        eventId: doc.id,
        type: "success",
      });
    });

    setData(eventData);
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};

const CalendarMain: React.FC = () => {
  const [events, setEvents] = useState<Record<string, EventData[]>>({});

  useEffect(() => {
    const currentMonth = dayjs(new Date());
    fetchEventsFromFirestore(currentMonth, setEvents);
  }, []);

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const listData = events[dateStr] || [];

    return (
      <div className="events">
        <ul>
          {listData.map((item, index) => (
            <Link
              to={`/event/${item.eventId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <li key={index}>
                <b>{item.eventName}</b>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalendarMain;
