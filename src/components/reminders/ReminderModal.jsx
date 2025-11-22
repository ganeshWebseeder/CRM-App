import React, { useState } from "react";

export default function ReminderModal({ show, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    project: "",
    datetime: "",   // store original datetime-local value
    status: "Pending",
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.project || !form.datetime) {
      alert("Please fill all fields!");
      return;
    }

    // Split date and time separately
    const [datePart, timePart] = form.datetime.split("T");

    onSave({
      id: Date.now(),
      title: form.title,
      project: form.project,
      status: form.status,

      // Calendar date → usable for day matching
      date: new Date(datePart),

      // Store time separately (useful for display)
      time: timePart,
    });

    onClose(); // close modal
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add Reminder
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Call client"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Project */}
          <div>
            <label className="text-sm text-gray-600">Project</label>
            <input
              type="text"
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
              placeholder="e.g., CRM System"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Date & Time */}
          <div>
            <label className="text-sm text-gray-600">Date & Time</label>
            <input
              type="datetime-local"
              value={form.datetime}
              onChange={(e) => setForm({ ...form, datetime: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-indigo-400"
            >
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Save Reminder
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}