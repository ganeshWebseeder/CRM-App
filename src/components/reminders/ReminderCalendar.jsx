import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function ReminderCalendar({ reminders, onDelete }) {
  const events = reminders.map((r) => ({
    id: r.id,
    title: `${r.title} (${r.project})`,
    start: new Date(r.date),
    end: new Date(r.date),
    allDay: false,
    status: r.status,
  }));

  // 🎨 Custom event style
  const eventStyleGetter = (event) => {
    const backgroundColor =
      event.status === "Done"
        ? "#22c55e" // green
        : event.status === "Pending"
        ? "#eab308" // yellow
        : "#3b82f6"; // blue (default)
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "6px",
        border: "none",
        fontSize: "0.8rem",
        padding: "2px 4px",
      },
    };
  };

  const handleEventClick = (event) => {
    if (
      window.confirm(
        `Delete reminder "${event.title}"?\nClick OK to confirm.`
      )
    ) {
      onDelete(event.id);
    }
  };

  return (
    <div className="h-[650px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        popup
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
