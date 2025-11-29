import React, { useState, useEffect } from "react";

export default function ProjectModal({ show, onClose, onSave, project }) {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [status, setStatus] = useState("Active");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Load project data when editing
  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setClient(project.client || "");
      setStatus(project.status || "Active");
      setStart(project.start || "");
      setEnd(project.end || "");
    } else {
      // Reset fields when adding new
      setName("");
      setClient("");
      setStatus("Active");
      setStart("");
      setEnd("");
    }
  }, [project]);

  // Handle Save
 const handleSubmit = () => {
  if (!name.trim()) {
    alert("Please enter project name");
    return;
  }

  if (!client.trim()) {
    alert("Please enter client name");
    return;
  }

  if (!start) {
    alert("Select start date");
    return;
  }

  if (!end) {
    alert("Select end date");
    return;
  }

  const projectData = {
    id: project?.id ?? Date.now(),
    name: name.trim(),
    client: client.trim(),
    status: status || "Active",
    start,
    end,
  };

  onSave(projectData);
  onClose();
};

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4 animate-fadeIn">
        
        {/* Modal Title */}
        <h2 className="text-lg font-semibold border-b pb-2">
          {project ? "Edit Project" : "Add New Project"}
        </h2>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            placeholder="Project Name"
            className="w-full border p-2 rounded text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Client Name"
            className="w-full border p-2 rounded text-sm"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <input
            type="date"
            className="w-full border p-2 rounded text-sm"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            type="date"
            className="w-full border p-2 rounded text-sm"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition text-sm"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
