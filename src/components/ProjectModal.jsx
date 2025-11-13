import React, { useState, useEffect } from "react";

export default function ProjectModal({ show, onClose, onSave, project }) {
  const [form, setForm] = useState({
    name: "",
    client: "",
    status: "Active",
    start: "",
    end: "",
  });

  // Load selected project into form when editing
  useEffect(() => {
    if (project) setForm(project);
  }, [project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.client.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    onSave({ ...form, id: project ? project.id : Date.now() });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[420px] animate-fadeIn">

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {project ? "✏️ Edit Project" : "➕ Add New Project"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Project Name */}
          <div>
            <label className="text-gray-600 text-sm">Project Name *</label>
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="Enter project name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="text-gray-600 text-sm">Client Name *</label>
            <input
              type="text"
              name="client"
              placeholder="Enter client name"
              value={form.client}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-gray-600 text-sm">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>Active</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>

          {/* Dates */}
          <div className="flex space-x-3">
            <div className="flex-1">
              <label className="text-gray-600 text-sm">Start Date</label>
              <input
                type="date"
                name="start"
                value={form.start}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex-1">
              <label className="text-gray-600 text-sm">End Date</label>
              <input
                type="date"
                name="end"
                value={form.end}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              {project ? "Update" : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
