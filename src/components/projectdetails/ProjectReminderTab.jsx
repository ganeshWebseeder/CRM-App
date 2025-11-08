import React, { useMemo, useState } from "react";

export default function ProjectRemindersTab() {
  const [reminders, setReminders] = useState([
    // demo rows
    { id: 1, title: "Payment follow-up", date: "2025-11-10", time: "10:00", email: true, done: false },
    { id: 2, title: "Maintenance visit", date: "2025-11-15", time: "15:30", email: false, done: false },
  ]);

  // form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState(false);

  // Add reminder
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !date) {
      alert("Please enter at least a title and date.");
      return;
    }
    const newItem = {
      id: Date.now(),
      title: title.trim(),
      date,
      time: time || "09:00",
      email,
      done: false,
    };
    setReminders((prev) => [...prev, newItem]);
    setTitle(""); setDate(""); setTime(""); setEmail(false);
  };

  // Toggle done
  const toggleDone = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  // Toggle email flag
  const toggleEmail = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, email: !r.email } : r))
    );
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this reminder?")) {
      setReminders((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // sort upcoming first, then done
  const sorted = useMemo(() => {
    return [...reminders].sort((a, b) => {
      const aKey = `${a.done ? 1 : 0}-${a.date}-${a.time}`;
      const bKey = `${b.done ? 1 : 0}-${b.date}-${b.time}`;
      return aKey.localeCompare(bKey);
    });
  }, [reminders]);

  return (
    <div className="space-y-6">
      {/* Form */}
      <form
        onSubmit={handleAdd}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-700">Add Reminder</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Payment follow-up"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>
          <div className="flex items-end">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={email}
                onChange={(e) => setEmail(e.target.checked)}
                className="h-4 w-4"
              />
              Email reminder
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length ? (
              sorted.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{r.title}</td>
                  <td className="p-3">{r.date}</td>
                  <td className="p-3">{r.time || "—"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleEmail(r.id)}
                      className={`px-2 py-0.5 rounded-md text-xs ${
                        r.email ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {r.email ? "On" : "Off"}
                    </button>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs ${
                        r.done ? "bg-gray-100 text-gray-600" : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {r.done ? "Done" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    {/* Mark as done/undo */}
                    <button
                      onClick={() => toggleDone(r.id)}
                      title={r.done ? "Mark as pending" : "Mark as done"}
                      className="text-xs px-2 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      {r.done ? "Undo" : "Done"}
                    </button>

                    {/* Delete */}
                    <i
                      className="ri-delete-bin-6-line text-red-500 text-lg cursor-pointer hover:text-red-700 transition"
                      onClick={() => handleDelete(r.id)}
                      title="Delete"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4 text-sm">
                  No reminders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
