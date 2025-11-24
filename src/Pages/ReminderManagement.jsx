import React, { useState, useEffect } from "react";
import ReminderCalendar from "../components/reminders/ReminderCalendar";
import ReminderModal from "../components/reminders/ReminderModal";
import { ReminderListModal } from "../components/reminders/ReminderListModel";

export default function ReminderManagement() {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) setReminders(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Save new reminder
  const handleSave = (reminder) => {
    setReminders((prev) => [...prev, reminder]);
  };

  // Delete reminder
  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  // FIXED DATE CLICK LOGIC
  const handleDateClick = (dateString) => {
    // Convert incoming string → Date object
    const dateObj = new Date(dateString);

    if (isNaN(dateObj.getTime())) {
      console.error("Invalid date received:", dateString);
      return;
    }

    const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
    setSelectedDate(date);

    const todaysReminders = reminders.filter((r) => r.date === date);

    if (todaysReminders.length === 0) {
      setShowAddModal(true); // no reminder → add modal
    } else {
      setShowListModal(true); // show list modal
    }
  };

  return (
    <div className="p-6 space-y-6">

      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <ReminderCalendar
          reminders={reminders}
          onDelete={handleDelete}
          onDateClick={handleDateClick}
        />
      </div>

      {/* Add New Reminder Modal */}
      <ReminderModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSave}
        defaultDate={selectedDate}
      />

      {/* List Reminders Modal */}
      <ReminderListModal
        show={showListModal}
        date={selectedDate}
        reminders={reminders.filter((r) => r.date === selectedDate)}
        onClose={() => setShowListModal(false)}
        onAddNew={() => {
          setShowListModal(false);
          setShowAddModal(true);
        }}
      />

    </div>
  );
}
