import React, { useState, useEffect } from "react";
import ReminderCalendar from "../components/reminders/ReminderCalendar";
import ReminderModal from "../components/reminders/ReminderModal";
import ReminderListModal from "../components/reminders/ReminderListModal";


export default function ReminderManagement() {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) {
      const parsed = JSON.parse(stored);

      // Normalize all reminders to YYYY-MM-DD
      const normalized = parsed.map(r => ({
        ...r,
        date: r.date.split("T")[0]  // FORCE YYYY-MM-DD
      }));

      setReminders(normalized);
      localStorage.setItem("reminders", JSON.stringify(normalized));
    }
  }, []);

  // Save to localStorage whenever reminders change
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Save new reminder — already YYYY-MM-DD
  const handleSave = (reminder) => {
    const cleanReminder = {
      ...reminder,
      date: reminder.date.split("T")[0], // make sure
    };

    setReminders((prev) => [...prev, cleanReminder]);
  };

  // Delete reminder
  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  // Calendar click → open modal or list
  const handleDateClick = (dateString) => {
    const formatted = dateString.split("T")[0];
    setSelectedDate(formatted);

    const todaysReminders = reminders.filter((r) => r.date === formatted);

    if (todaysReminders.length === 0) {
      setShowAddModal(true);
    } else {
      setShowListModal(true);
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

      {/* Add Reminder */}
      <ReminderModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSave}
        defaultDate={selectedDate}
      />

      {/* List Reminders */}
      <ReminderListModal
  show={showListModal}
  date={selectedDate}
  reminders={reminders.filter((r) => r.date === selectedDate)}
  onClose={() => setShowListModal(false)}
  onAddNew={() => {
    setShowListModal(false);   // close list modal
    setShowAddModal(true);     // open add modal
  }}
/>

    </div>
  );
}
