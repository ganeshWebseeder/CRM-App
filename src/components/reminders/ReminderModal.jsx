import React, { useState, useEffect } from "react";

export default function ReminderModal({ show, onClose, onSave, defaultDate }) {
  const [form, setForm] = useState({
    title: "",
    project: "",
    datetime: "",
    status: "Pending",
  });

  useEffect(() => {
    if (defaultDate) {
      // defaultDate is a plain YYYY-MM-DD string
      setForm((prev) => ({
        ...prev,
        datetime: `${defaultDate}T09:00`,
      }));
    }
  }, [defaultDate]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.project || !form.datetime) {
      alert("Please fill all fields!");
      return;
    }

    const [datePart, timePart] = form.datetime.split("T");

    onSave({
      id: Date.now(),
      title: form.title,
      project: form.project,
      status: form.status,
      date: datePart,   // stays correct string
      time: timePart,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">
        <h2 className="text-lg font-semibold mb-4">Add Reminder</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Project</label>
            <input
              type="text"
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Date & Time</label>
            <input
              type="datetime-local"
              value={form.datetime}
              onChange={(e) => setForm({ ...form, datetime: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border rounded-md px-3 py-2 mt-1"
            >
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
