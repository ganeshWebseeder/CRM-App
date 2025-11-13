import React, { useState } from "react";

export default function ReminderCalendar({ reminders, onDelete, onDateClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Start of month
  const firstDay = new Date(year, month, 1).getDay();
  // Total days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  // Helper: Check if reminder exists for date
  const hasReminder = (day) => {
    return reminders.some(
      (r) =>
        r.date.getFullYear() === year &&
        r.date.getMonth() === month &&
        r.date.getDate() === day
    );
  };

  return (
    <div className="w-full">

      {/* Month Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() =>
            setCurrentDate(new Date(year, month - 1, 1))
          }
          className="p-2 rounded hover:bg-gray-100"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>

        <button
          onClick={() =>
            setCurrentDate(new Date(year, month + 1, 1))
          }
          className="p-2 rounded hover:bg-gray-100"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1 text-xs">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarDays.map((day, index) => {
          if (!day)
            return <div key={index} className="h-16"></div>;

          const isHighlighted = hasReminder(day);

          return (
            <div
              key={index}
              onClick={() => onDateClick(day)}
              className={`h-16 flex flex-col items-center justify-start p-2 cursor-pointer rounded-md border 
              ${
                isHighlighted
                  ? "bg-indigo-50 border-indigo-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              } transition`}
            >
              {/* DATE NUMBER */}
              <p
                className={`text-sm font-medium ${
                  isHighlighted ? "text-indigo-700" : "text-gray-700"
                }`}
              >
                {day}
              </p>

              {/* DOT INDICATOR */}
              {isHighlighted && (
                <span className="mt-1 w-2 h-2 rounded-full bg-indigo-500"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
