import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProjectModal({ show, onClose, onSave, project }) {
  const emptyForm = {
    name: "",
    client: "",
    status: "Active",
    start: "",
    end: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (project) setForm(project);
    else setForm(emptyForm);
  }, [project]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-8 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={22} />
        </button>

        {/* Add New Project When Editing */}
        {project && (
          <button
            onClick={() => setForm(emptyForm)}
            className="absolute top-4 left-4 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 transition"
          >
            + Add New Project
          </button>
        )}

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {project ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* Project Name */}
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Project Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter project name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Client Name */}
          <div>
            <label className="text-gray-600 text-sm font-medium">
              Client Name *
            </label>
            <input
              type="text"
              name="client"
              placeholder="Enter client name"
              value={form.client}
              onChange={handleChange}
              className="mt-1 border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-gray-600 text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="mt-1 border border-gray-300 p-2.5 rounded-lg w-full bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option>Active</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-600 text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                name="start"
                value={form.start}
                onChange={handleChange}
                className="mt-1 border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">
                End Date
              </label>
              <input
                type="date"
                name="end"
                value={form.end}
                onChange={handleChange}
                className="mt-1 border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="mt-2 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            {project ? "Update Project" : "Save Project"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
