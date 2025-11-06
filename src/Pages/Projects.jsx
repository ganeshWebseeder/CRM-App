import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProjectModal from "../components/ProjectModal";

export default function Projects() {
  const navigate = useNavigate();

  // 🧠 States
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");

  // 📋 Sample Data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "CRM Revamp",
      client: "WebSeeder Technologies",
      status: "Active",
      start: "2025-01-10",
      end: "2025-12-31",
    },
    {
      id: 2,
      name: "Inventory System",
      client: "TechNova Pvt. Ltd.",
      status: "Completed",
      start: "2024-04-01",
      end: "2024-10-15",
    },
    {
      id: 3,
      name: "Marketing Portal",
      client: "CloudEdge",
      status: "On Hold",
      start: "2025-03-05",
      end: "2025-09-01",
    },
    {
      id: 4,
      name: "E-commerce Redesign",
      client: "WebSeeder Technologies",
      status: "Active",
      start: "2025-02-01",
      end: "2025-11-30",
    },
  ]);

  // 🧮 Unique Clients
  const uniqueClients = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.client))],
    [projects]
  );

  // 🔍 Filters
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesClient = clientFilter === "All" || p.client === clientFilter;
    return matchesSearch && matchesStatus && matchesClient;
  });

  // ✏️ Edit Project
  const handleEdit = (project) => {
    setEditProject(project);
    setShowModal(true);
  };

  // ❌ Delete Project
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // 💾 Save Project (from Modal)
  const handleSave = (project) => {
    if (editProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editProject.id ? project : p))
      );
    } else {
      setProjects((prev) => [...prev, { ...project, id: Date.now() }]);
    }
    setShowModal(false);
    setEditProject(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* 🏷 Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
        <p className="text-gray-500 text-sm">
          Manage, search, filter, and view all active and completed projects.
        </p>
      </div>

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-xs">Total Projects</p>
          <h2 className="text-xl font-semibold text-gray-800">
            {projects.length}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-xs">Active</p>
          <h2 className="text-xl font-semibold text-green-600">
            {projects.filter((p) => p.status === "Active").length}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-xs">Completed</p>
          <h2 className="text-xl font-semibold text-indigo-600">
            {projects.filter((p) => p.status === "Completed").length}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-xs">On Hold</p>
          <h2 className="text-xl font-semibold text-yellow-600">
            {projects.filter((p) => p.status === "On Hold").length}
          </h2>
        </div>
      </div>

      {/* 🔍 Search & Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64 focus:ring-1 focus:ring-indigo-400"
        />

        <div className="flex space-x-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-1 focus:ring-indigo-400"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-1 focus:ring-indigo-400"
          >
            {uniqueClients.map((client, index) => (
              <option key={index} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setEditProject(null);
            setShowModal(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition"
        >
          + Add Project
        </button>
      </div>

      {/* 📋 Projects Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-xs text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-3 text-left">Project Name</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.client}</td>
                  <td
                    className={`p-3 font-medium ${
                      p.status === "Active"
                        ? "text-green-600"
                        : p.status === "Completed"
                        ? "text-indigo-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="p-3">{p.start}</td>
                  <td className="p-3">{p.end}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/projects/${p.id}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-md transition"
                    >
                      View Project Details
                    </button>
                    <i
    className="ri-edit-line text-indigo-600 cursor-pointer"
    onClick={() => handleEdit(p)}
  ></i>
  <i
    className="ri-delete-bin-line text-red-500 cursor-pointer"
    onClick={() => handleDelete(p.id)}
  ></i>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ➕ Modal */}
      {showModal && (
        <ProjectModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setEditProject(null);
          }}
          onSave={handleSave}
          project={editProject}
        />
      )}
    </div>
  );
}
