import { useState } from "react";

export default function ReminderModal({ selectedDate, reminders, onSave, onClose }) {
  const formattedDate = selectedDate.toDateString();

  const existing = reminders[formattedDate] || [];

  const [mode, setMode] = useState(existing.length > 0 ? "view" : "add");
  const [newReminder, setNewReminder] = useState({ time: "", text: "" });

  const saveReminder = () => {
    if (!newReminder.time || !newReminder.text) return;

    onSave(selectedDate, newReminder);
    setNewReminder({ time: "", text: "" });
    setMode("view");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl relative z-50">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Reminders for {formattedDate}
          </h2>

          {mode === "view" && (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded-md"
              onClick={() => setMode("add")}
            >
              Add New Reminder
            </button>
          )}
        </div>

        {/* View Mode */}
        {mode === "view" && (
          <div>
            {existing.length === 0 ? (
              <p className="text-gray-500 text-sm">No reminders set for this date.</p>
            ) : (
              <ul className="space-y-3">
                {existing.map((r, idx) => (
                  <li key={idx} className="border p-3 rounded-md bg-gray-50 shadow-sm">
                    <p className="text-sm font-medium">⏰ {r.time}</p>
                    <p className="text-gray-600">{r.text}</p>
                  </li>
                ))}
              </ul>
            )}

            <button
              className="mt-5 w-full py-2 bg-gray-700 text-white rounded-md"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {/* Add Mode */}
        {mode === "add" && (
          <div>
            <div className="mb-3">
              <label className="text-sm">Time</label>
              <input
                type="time"
                className="w-full border rounded-md px-2 py-1"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="text-sm">Reminder Message</label>
              <textarea
                className="w-full border rounded-md px-2 py-1"
                rows={3}
                value={newReminder.text}
                onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
              />
            </div>

            <button
              className="w-full py-2 bg-green-600 text-white rounded-md mb-2"
              onClick={saveReminder}
            >
              Save Reminder
            </button>

            <button
              className="w-full py-2 bg-gray-600 text-white rounded-md"
              onClick={() => setMode("view")}
            >
              Back
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
