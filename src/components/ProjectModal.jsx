import React, { useState, useEffect } from "react";

export default function ProjectModal({ show, onClose, onSave, project }) {
  const [form, setForm] = useState({
    name: "",
    client: "",
    status: "Active",
    start: "",
    end: "",
  });

  useEffect(() => {
    if (project) setForm(project);
  }, [project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.client) {
      alert("Please fill all fields!");
      return;
    }
    onSave({ ...form, id: project ? project.id : Date.now() });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {project ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="client"
            placeholder="Client Name"
            value={form.client}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-indigo-400"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-indigo-400"
          >
            <option>Active</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
          <div className="flex space-x-2">
            <input
              type="date"
              name="start"
              value={form.start}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-indigo-400"
            />
            <input
              type="date"
              name="end"
              value={form.end}
              onChange={handleChange}
              className="w-1/2 border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {project ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
