import React, { useState, useEffect } from "react";

export default function ProjectMaintenanceTab() {
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false);
  const [visits, setVisits] = useState([]);
  const [visitDate, setVisitDate] = useState("");
  const [notes, setNotes] = useState("");
  const [nextVisit, setNextVisit] = useState("");

  // 🧠 Simulate "Auto-start after project completion"
  useEffect(() => {
    // Simulate that maintenance auto-starts after completion
    setIsMaintenanceActive(true);
  }, []);

  // ➕ Add Visit
  const handleAddVisit = (e) => {
    e.preventDefault();

    if (!visitDate || !notes) {
      alert("Please enter visit date and notes!");
      return;
    }

    const newVisit = {
      id: Date.now(),
      visitDate,
      notes,
      nextVisit: nextVisit || "Not Scheduled",
    };

    setVisits((prev) => [...prev, newVisit]);
    setVisitDate("");
    setNotes("");
    setNextVisit("");
  };

  // ❌ Delete Visit
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setVisits((prev) => prev.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 🧾 Maintenance Status */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Maintenance Status</h2>
          <p className="text-sm text-gray-500">
            {isMaintenanceActive
              ? "Maintenance cycle is active for this project."
              : "Maintenance has not started yet."}
          </p>
        </div>
        <div
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            isMaintenanceActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isMaintenanceActive ? "Active" : "Inactive"}
        </div>
      </div>

      {/* 🧾 Add Visit Form */}
      <form
        onSubmit={handleAddVisit}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Add Maintenance Visit
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Visit Date */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Visit Date
            </label>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Visit Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter maintenance notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Next Visit */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Next Visit (Optional)
            </label>
            <input
              type="date"
              value={nextVisit}
              onChange={(e) => setNextVisit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isMaintenanceActive}
            className={`text-sm px-4 py-2 rounded-md transition ${
              isMaintenanceActive
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add Visit
          </button>
        </div>
      </form>

      {/* 🧾 Visits Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-3 text-left">Visit Date</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-left">Next Visit</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visits.length > 0 ? (
              visits.map((visit) => (
                <tr key={visit.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-gray-800">{visit.visitDate}</td>
                  <td className="p-3">{visit.notes}</td>
                  <td className="p-3 text-gray-500">
                    {visit.nextVisit || "Not Scheduled"}
                  </td>
                  <td className="p-3 text-center">
                    <i
                      className="ri-delete-bin-6-line text-red-500 text-lg cursor-pointer hover:text-red-700 transition"
                      onClick={() => handleDelete(visit.id)}
                      title="Delete Visit"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  No maintenance visits recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
