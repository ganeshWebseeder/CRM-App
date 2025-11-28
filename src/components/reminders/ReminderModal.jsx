import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useReminder } from "../../context/ReminderContext";

export default function ReminderModal({ show, onClose, defaultDate }) {
  const { addReminder } = useReminder();

  if (!show) return null;

  const [form, setForm] = useState({
    title: "",
    project: "",
    date: defaultDate || "",
    time: "",
    priority: "Medium",
    category: "Task",
    notes: "",
    repeat: "One-time",
    alertBefore: "10 min",
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, date: defaultDate || "" }));
  }, [defaultDate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.project || !form.date || !form.time) {
      alert("Please fill all required fields");
      return;
    }
    addReminder({ id: Date.now(), ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-indigo-600 mb-4 text-center">
          Add New Reminder
        </h2>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Reminder Title"
            className="border p-2 rounded"
          />

          {/* Project */}
          <input
            type="text"
            name="project"
            value={form.project}
            onChange={handleChange}
            placeholder="Project Name"
            className="border p-2 rounded"
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Time */}
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Priority */}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Task</option>
            <option>Work</option>
            <option>Call</option>
            <option>Meeting</option>
            <option>Follow Up</option>
            <option>Personal</option>
          </select>

          {/* Repeat */}
          <select
            name="repeat"
            value={form.repeat}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>One-time</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          {/* Alert Before */}
          <select
            name="alertBefore"
            value={form.alertBefore}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>5 min</option>
            <option>10 min</option>
            <option>30 min</option>
            <option>1 hr</option>
            <option>1 day</option>
          </select>

          {/* Notes */}
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (optional)"
            className="border p-2 rounded sm:col-span-2 h-24"
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="sm:col-span-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Save Reminder
          </button>
        </div>
      </motion.div>
    </div>
  );
}
