import React, { useState } from "react";

export default function ReminderModal({ show, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    project: "",
    date: "",
    status: "Pending",
  });

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.project || !form.date) {
      alert("Please fill all fields!");
      return;
    }
    onSave({
      ...form,
      id: Date.now(),
      date: new Date(form.date),
    });
    onClose();
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
              placeholder="e.g., Call client for update"
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
              placeholder="e.g., CRM Revamp"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-gray-600">Date & Time</label>
            <input
              type="datetime-local"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
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
