import React, { useState, useEffect } from "react";
import ReminderCalendar from "../components/reminders/ReminderCalendar";
import ReminderModal from "../components/reminders/ReminderModal";
import ReminderListModal from "../components/reminders/ReminderListModal";

export default function ReminderManagement() {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDayReminders, setSelectedDayReminders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  // Load reminders from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("reminders");
    if (stored) {
      const parsed = JSON.parse(stored);

      // Normalize to YYYY-MM-DD format
      const normalized = parsed.map((r) => ({
        ...r,
        date: r.date.split("T")[0],
      }));

      setReminders(normalized);
      localStorage.setItem("reminders", JSON.stringify(normalized));
    }
  }, []);

  // Save reminders to localStorage every time reminders update
  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  // Add Reminder
  const handleSave = (reminder) => {
    const cleanReminder = {
      ...reminder,
      date: reminder.date.split("T")[0],
    };

    setReminders((prev) => [...prev, cleanReminder]);
  };

  // Delete Reminder
  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  // Calendar Date Click Handler
  const handleDateClick = (dateString, remindersForDay) => {
    setSelectedDate(dateString);
    setSelectedDayReminders(remindersForDay);

    if (remindersForDay.length > 0) {
      setShowListModal(true);
    } else {
      setShowAddModal(true);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <ReminderCalendar
          reminders={reminders}
          onDelete={handleDelete}
          onDateClick={handleDateClick} // UPDATED
        />
      </div>

      {/* Add Reminder Modal */}
      <ReminderModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSave}
        defaultDate={selectedDate}
      />

      {/* Reminder List Modal */}
      <ReminderListModal
        show={showListModal}
        date={selectedDate}
        reminders={selectedDayReminders}  // UPDATED
        onClose={() => setShowListModal(false)}
        onAddNew={() => {
          setShowListModal(false);
          setShowAddModal(true);
        }}
      />
    </div>
  );
}
