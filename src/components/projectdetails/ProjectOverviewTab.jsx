import React, { useState, useEffect } from "react";

export default function ProjectOverviewTab({ id }) {
  const [project, setProject] = useState(null);
  const [notes, setNotes] = useState("");
  const [editMode, setEditMode] = useState(false);

  // NEW STATE: For editing progress
  const [progressEdit, setProgressEdit] = useState(null);
  const [progressEditMode, setProgressEditMode] = useState(false);

  // 🧠 Temporary Demo Data (Simulate API)
  useEffect(() => {
    const demoData = {
      id,
      name: "CRM Revamp",
      client: "WebSeeder Technologies",
      status: "Active",
      startDate: "2025-01-10",
      expectedEndDate: "2025-12-31",
      actualEndDate: "",
      progress: 60,
      notes:
        "The project involves a full redesign of the CRM platform for improved performance and UI enhancements.",
    };

    setProject(demoData);
    setNotes(demoData.notes);
    setProgressEdit(demoData.progress);
  }, [id]);

  const handleSaveNotes = () => {
    setEditMode(false);
    alert("Notes updated successfully!");
  };

  const handleSaveProgress = () => {
    setProject((prev) => ({ ...prev, progress: progressEdit }));
    setProgressEditMode(false);
    alert("Progress updated successfully!");
  };

  if (!project) {
    return <p className="text-gray-500 text-sm">Loading project details...</p>;
  }

  return (
    <div className="space-y-6">
      {/* 🏷 Project Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {project.name}
          </h2>
          <p className="text-gray-500 text-sm">
            Client: <span className="text-gray-700">{project.client}</span>
          </p>
        </div>
        <span
          className={`mt-2 sm:mt-0 inline-block px-3 py-1 text-xs font-medium rounded-full ${
            project.status === "Active"
              ? "bg-green-100 text-green-700"
              : project.status === "Completed"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* 📅 Project Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-xs">Start Date</p>
          <p className="text-sm font-medium text-gray-800">
            {project.startDate}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-xs">Expected End Date</p>
          <p className="text-sm font-medium text-gray-800">
            {project.expectedEndDate}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-gray-500 text-xs">Actual End Date</p>
          <p className="text-sm font-medium text-gray-800">
            {project.actualEndDate || "—"}
          </p>
        </div>
      </div>

      {/* 📊 Progress Section */}
      <div className="bg-white rounded-lg shadow p-4 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Project Progress</p>

          {!progressEditMode && (
            <button
              onClick={() => setProgressEditMode(true)}
              className="text-indigo-600 text-xs hover:underline"
            >
              Edit
            </button>
          )}
        </div>

        {/* Live Preview Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressEdit}%` }}
          ></div>
        </div>

        <p className="text-right text-xs text-gray-500">
          {progressEdit}% completed
        </p>

        {/* Editable Input */}
        {progressEditMode && (
          <div className="flex items-center justify-between mt-3">
            <input
              type="number"
              min="0"
              max="100"
              value={progressEdit}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, Number(e.target.value)));
                setProgressEdit(val);
              }}
              className="border px-3 py-1 rounded-md text-sm w-24"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setProgressEditMode(false);
                  setProgressEdit(project.progress);
                }}
                className="px-3 py-1 text-xs border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProgress}
                className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 📝 Notes Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-800">Project Notes</h3>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="text-indigo-600 text-xs hover:underline"
            >
              Edit
            </button>
          )}
        </div>

        {editMode ? (
          <div className="space-y-2">
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-indigo-400"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setEditMode(false);
                  setNotes(project.notes);
                }}
                className="px-3 py-1 text-xs border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {notes}
          </p>
        )}
      </div>
    </div>
  );
}
