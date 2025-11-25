import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ReminderModal({ show, onClose, onSave, defaultDate }) {
  if (!show) return null;

  // Initialize reminder form
  const [form, setForm] = useState({
    title: "",
    project: "",
    date: defaultDate || "",
    time: "",
  });

  // When defaultDate changes → update form date
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      date: defaultDate || "",
    }));
  }, [defaultDate]);

  // Handle all input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Save reminder
  const handleSubmit = () => {
    if (!form.title || !form.project || !form.date || !form.time) {
      alert("Please fill all the fields");
      return;
    }

    onSave({
      id: Date.now(),
      ...form,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-lg font-semibold text-indigo-700 mb-4 text-center">
          Add New Reminder
        </h2>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Reminder Title"
          className="w-full border p-2 mb-3 rounded-md"
        />

        {/* Project Name */}
        <input
          type="text"
          name="project"
          value={form.project}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full border p-2 mb-3 rounded-md"
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded-md"
        />

        {/* Time */}
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded-md"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
