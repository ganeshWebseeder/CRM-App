import React, { useState, useEffect } from "react";
import ReminderCalendar from "../components/reminders/ReminderCalendar";
import ReminderModal from "../components/reminders/ReminderModal";

export default function ReminderManagement() {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 🧠 Load reminders from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) setReminders(JSON.parse(stored));
  }, []);

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // ➕ Add Reminder
  const handleSave = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  // 🗑 Delete Reminder
  const handleDelete = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  // 📅 When a date is clicked, open the modal
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <p className="text-gray-500 text-sm">
          View and manage reminders from all projects in calendar view.
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <ReminderCalendar
          reminders={reminders}
          onDelete={handleDelete}
          onDateClick={handleDateClick} // ✅ Pass new handler
        />
      </div>

      {/* Reminder Modal */}
      {showModal && (
        <ReminderModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          defaultDate={selectedDate}
        />
      )}
    </div>
  );
}
