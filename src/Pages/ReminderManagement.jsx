import React, { useState, useEffect } from "react";
import ReminderCalendar from "../components/reminders/ReminderCalendar";
import ReminderModal from "../components/reminders/ReminderModal";

export default function ReminderManagement() {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🧠 Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) setReminders(JSON.parse(stored));
  }, []);

  // 💾 Save to localStorage whenever reminders change
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Reminder Management
          </h1>
          <p className="text-gray-500 text-sm">
            View and manage reminders from all projects in calendar view.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition"
        >
          + Add Reminder
        </button>
      </div>

      {/* Calendar Section */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <ReminderCalendar reminders={reminders} onDelete={handleDelete} />
      </div>

      {/* Modal for Adding Reminder */}
      {showModal && (
        <ReminderModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
