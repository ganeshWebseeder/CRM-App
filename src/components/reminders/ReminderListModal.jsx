import React from "react";
import { motion } from "framer-motion";

export default function ReminderListModal({
  show,
  date,
  reminders = [],   // ✅ prevents undefined
  onClose,
  onAddNew,
}) {
  if (!show) return null;

  // Extra safety: always return an array
  const safeReminders = Array.isArray(reminders) ? reminders : [];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-lg font-semibold text-indigo-700 mb-3">
          Reminders on {date}
        </h2>

        {safeReminders.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No reminders</p>
        ) : (
          <div className="space-y-3">
            {safeReminders.map((r) => (
              <div
                key={r.id}
                className="border p-3 rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-gray-600">{r.project}</p>
                  <p className="text-xs text-indigo-600">{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-5">
          <button
            onClick={onAddNew}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            + Add New
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
