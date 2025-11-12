import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  PlusCircle,
  CheckCircle,
  Briefcase,
  Trash2,
} from "lucide-react";

export default function LeadManagementPage() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      clientName: "Rohan Patel",
      phone: "9876543210",
      mail: "rohan.patel@example.com",
      status: "New",
      source: "Website",
      notes: "Interested in website redesign",
    },
    {
      id: 2,
      clientName: "Priya Sharma",
      phone: "9876501234",
      mail: "priya.sharma@example.com",
      status: "Follow Up",
      source: "Referral",
      notes: "Needs quotation by Friday",
    },
  ]);

  const [newLead, setNewLead] = useState({
    clientName: "",
    phone: "",
    mail: "",
    status: "New",
    source: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setLeads(
        leads.map((lead) =>
          lead.id === editingId ? { ...newLead, id: editingId } : lead
        )
      );
      setEditingId(null);
    } else {
      setLeads([...leads, { ...newLead, id: Date.now() }]);
    }
    setNewLead({
      clientName: "",
      phone: "",
      mail: "",
      status: "New",
      source: "",
      notes: "",
    });
  };

  const handleEdit = (lead) => {
    setEditingId(lead.id);
    setNewLead(lead);
  };

  const handleConvertToProject = (id) => {
    const updated = leads.map((lead) =>
      lead.id === id ? { ...lead, status: "Converted to Project" } : lead
    );
    setLeads(updated);
  };

  const handleStatusChange = (id, status) => {
    setLeads(
      leads.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  return (
    <div className=" p-4 sm:p-6 bg-gray-100 min-h-screen">
      

      <div className=" gap-6">
        {/* Left Side - Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            {editingId ? "Edit Lead" : "Add New Lead"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client Name"
              value={newLead.clientName}
              onChange={(e) =>
                setNewLead({ ...newLead, clientName: e.target.value })
              }
              className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newLead.mail}
              onChange={(e) => setNewLead({ ...newLead, mail: e.target.value })}
              className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              value={newLead.status}
              onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
              className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>New</option>
              <option>Follow Up</option>
              <option>Closed</option>
            </select>
            <input
              type="text"
              placeholder="Source"
              value={newLead.source}
              onChange={(e) =>
                setNewLead({ ...newLead, source: e.target.value })
              }
              className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Notes"
              value={newLead.notes}
              onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
              className="border p-2 rounded-lg sm:col-span-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="mt-5 flex items-center justify-center bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all w-full"
          >
            {editingId ? (
              <>
                <Pencil size={18} className="mr-2" /> Update Lead
              </>
            ) : (
              <>
                <PlusCircle size={18} className="mr-2" /> Add Lead
              </>
            )}
          </button>
        </motion.form>

        {/* Right Side - Data Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">
            Leads Overview
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-indigo-100 text-gray-700">
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Source</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  className="border-b hover:bg-gray-50 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="p-3">{lead.clientName}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.mail}</td>
                  <td className="p-3">
                    <select
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                      className="border rounded-md px-2 py-1"
                    >
                      <option>New</option>
                      <option>Follow Up</option>
                      <option>Closed</option>
                      <option>Converted to Project</option>
                    </select>
                  </td>
                  <td className="p-3">{lead.source}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(lead)}
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleConvertToProject(lead.id)}
                      className="text-green-600 hover:text-green-800"
                      title="Convert"
                    >
                      <Briefcase size={18} />
                    </button>
                    <button
                      onClick={() => handleStatusChange(lead.id, "Closed")}
                      className="text-gray-600 hover:text-gray-800"
                      title="Close"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
