import React, { useState, useMemo } from "react";
import ProjectModal from "../components/ProjectModal";

export default function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");

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

  // Unique client list
  const uniqueClients = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.client))],
    [projects]
  );

  // Search + filter logic
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || p.status === statusFilter;
    const matchesClient =
      clientFilter === "All" || p.client === clientFilter;
    return matchesSearch && matchesStatus && matchesClient;
  });

  // Save Project
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

  // Edit Project
  const handleEdit = (project) => {
    setEditProject(project);
    setShowModal(true);
  };

  // Delete Project
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 space-y-6 bg-gray-50 min-h-screen overflow-x-hidden">
      {/* 🏷 Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
        <p className="text-gray-500 text-sm">
          Manage, search, and filter your ongoing and completed projects.
        </p>
      </div>

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: projects.length, color: "text-gray-800" },
          {
            label: "Active",
            value: projects.filter((p) => p.status === "Active").length,
            color: "text-green-600",
          },
          {
            label: "Completed",
            value: projects.filter((p) => p.status === "Completed").length,
            color: "text-indigo-600",
          },
          {
            label: "On Hold",
            value: projects.filter((p) => p.status === "On Hold").length,
            color: "text-yellow-600",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition text-center"
          >
            <p className="text-gray-500 text-xs">{card.label}</p>
            <h2 className={`text-xl font-semibold ${card.color}`}>
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* 🔍 Filters + Search + Add */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64 focus:ring-1 focus:ring-indigo-500"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500"
          >
            {uniqueClients.map((client, i) => (
              <option key={i} value={client}>
                {client}
              </option>
            ))}
          </select>

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
      </div>

      {/* 📋 Projects Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
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
                  <td className="p-3 font-medium text-gray-800">{p.name}</td>
                  <td className="p-3">{p.client}</td>
                  <td
                    className={`p-3 font-semibold ${
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
                  <td className="p-3 text-center space-x-3">
                    <i
                      className="ri-edit-line text-indigo-600 cursor-pointer hover:text-indigo-800"
                      onClick={() => handleEdit(p)}
                    ></i>
                    <i
                      className="ri-delete-bin-line text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleDelete(p.id)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
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
