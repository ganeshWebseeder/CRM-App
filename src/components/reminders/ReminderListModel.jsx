export function ReminderListModal({
  show,
  reminders,
  date,
  onClose,
  onAddNew,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Reminders for {date}
          </h2>

          <button
            onClick={onAddNew}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm"
          >
            Add New
          </button>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {reminders.map((r) => (
            <div key={r.id} className="border rounded-md p-3">
              <p className="font-semibold">{r.title}</p>
              <p className="text-sm text-gray-600">Project: {r.project}</p>
              <p className="text-sm text-gray-600">Time: {r.time}</p>
              <p>Status: {r.status}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
