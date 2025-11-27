import React, { createContext, useContext, useState } from "react";

const ReminderContext = createContext();

export const useReminder = () => useContext(ReminderContext);

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  const addReminder = (reminder) => {
    setReminders((prev) => [...prev, reminder]);
  };

  const getRemindersByDate = (date) =>
    reminders.filter((r) => r.date === date);

  return (
    <ReminderContext.Provider
      value={{ reminders, addReminder, getRemindersByDate }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
