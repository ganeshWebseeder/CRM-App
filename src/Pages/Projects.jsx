import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import ProjectModal from "../components/ProjectModal";
import { PlusSquare } from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();

  // State
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [clientFilter, setClientFilter] = useState("All");

  // Project List
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

  // Filter Logic
  const filteredProjects = projects.filter((p) => {
  const q = searchTerm.toLowerCase();

  const matchesSearch =
    p.name.toLowerCase().includes(q) ||
    p.client.toLowerCase().includes(q);

  const matchesStatus =
    statusFilter === "All" || p.status === statusFilter;

  const matchesClient =
    clientFilter === "All" || p.client === clientFilter;

  return matchesSearch && matchesStatus && matchesClient;
});


  // Edit handler
  const handleEdit = (project) => {
    setEditProject(project);
    setShowModal(true);
  };

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Save (Add/Edit)
  const handleSave = (project) => {
    if (editProject) {
      // Update existing project
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? project : p))
      );
    } else {
      // Add new project
      setProjects((prev) => [...prev, project]);
    }

    setShowModal(false);
    setEditProject(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <p className="text-gray-500 text-sm">
        Manage, search, filter, and view all active and completed projects.
      </p>

      {/* Summary Cards */}
      <motion.div
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Total Projects",
            value: projects.length,
            icon: "ri-briefcase-line",
            color: "from-blue-200 to-blue-200",
            text: "text-blue-700",
          },
          {
            label: "Active",
            value: projects.filter((p) => p.status === "Active").length,
            icon: "ri-play-circle-line",
            color: "from-green-200 to-green-200",
            text: "text-green-700",
          },
          {
            label: "Completed",
            value: projects.filter((p) => p.status === "Completed").length,
            icon: "ri-checkbox-circle-line",
            color: "from-yellow-200 to-yellow-200",
            text: "text-indigo-700",
          },
          {
            label: "On Hold",
            value: projects.filter((p) => p.status === "On Hold").length,
            icon: "ri-time-line",
            color: "from-rose-200 to-rose-200",
            text: "text-yellow-700",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.02,
              y: -2,
              boxShadow: "0 8px 15px rgba(0,0,0,0.05)",
            }}
            transition={{ type: "spring", stiffness: 120 }}
            className={`cursor-pointer p-4 rounded-xl bg-gradient-to-r ${card.color}
                        shadow-sm flex justify-between items-center hover:opacity-95 transition`}
          >
            <div>
              <p className="text-base text-gray-600 mb-2">{card.label}</p>
              <h2 className="text-base font-semibold text-gray-600">
                {card.value}
              </h2>
            </div>

            <div className="w-10 h-10 flex items-center justify-center bg-black/10 p-3 rounded-full">
              <i className={`${card.icon} text-xl ${card.text}`}></i>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by name or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64 focus:ring-1 focus:ring-indigo-500"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
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
            className="sm:inline-flex items-center gap-2 px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          >
            <PlusSquare size={14} />
            <span> New Project </span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <motion.div
        className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200 p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-indigo-100 text-gray-700 uppercase">
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
              filteredProjects.map((p, index) => (
                <motion.tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={(e) => {
                    if (e.target.closest(".action-btn")) return;
                    navigate(`/projects/${p.id}`);
                  }}
                >
                  <td className="p-3 font-medium text-gray-800">{p.name}</td>
                  <td className="p-3">{p.client}</td>

                  {/* Status dropdown */}
                  <td className="p-3">
                    <select
                      value={p.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        const newStatus = e.target.value;

                        setProjects((prev) =>
                          prev.map((proj) =>
                            proj.id === p.id
                              ? { ...proj, status: newStatus }
                              : proj
                          )
                        );
                      }}
                      className={`px-3 py-1 rounded-md text-sm font-medium border 
                        ${
                          p.status === "Active"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : p.status === "Completed"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-yellow-100 text-yellow-700 border-yellow-300"
                        }
                      `}
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </td>

                  <td className="p-3">{p.start}</td>
                  <td className="p-3">{p.end}</td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <i
                        className="ri-edit-line action-btn text-indigo-600 cursor-pointer hover:text-indigo-800 p-2"
                        onClick={() => handleEdit(p)}
                      ></i>

                      <i
                        className="ri-delete-bin-line action-btn text-red-500 cursor-pointer hover:text-red-700 p-2"
                        onClick={() => handleDelete(p.id)}
                      ></i>
                    </div>
                  </td>
                </motion.tr>
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
      </motion.div>

      {/* Modal */}
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
