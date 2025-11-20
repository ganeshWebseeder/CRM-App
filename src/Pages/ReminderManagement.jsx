import React, { useState, useEffect } from "react";
import ReminderCalendar from "../components/reminders/ReminderCalendar";
import ReminderModal from "../components/reminders/ReminderModal";

export default function ReminderManagement() {
  const [reminders, setReminders] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Load from storage
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) setReminders(JSON.parse(stored));
  }, []);

  // Store updates
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleSave = (date, reminder) => {
    const formattedDate = date.toDateString();

    setReminders((prev) => ({
      ...prev,
      [formattedDate]: [...(prev[formattedDate] || []), reminder],
    }));

    setShowModal(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      <p className="text-gray-500 text-sm">
        View and manage reminders in calendar view.
      </p>

      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <ReminderCalendar
          reminders={reminders}
          onDateClick={handleDateClick}
        />
      </div>

      {showModal && selectedDate && (
        <ReminderModal
          selectedDate={selectedDate}
          reminders={reminders}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
