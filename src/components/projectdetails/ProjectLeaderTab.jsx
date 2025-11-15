import React, { useState, useMemo } from "react";

export default function ProjectLedgerTab() {
  const [entries, setEntries] = useState([]);
  const [type, setType] = useState("Credit");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [linkedInvoice, setLinkedInvoice] = useState("");
  const [date, setDate] = useState("");

  // Dummy invoice numbers (simulate linked invoices)
  const invoices = ["INV-001", "INV-002", "INV-003", "INV-004"];

  // 🧾 Add Transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description || !date) {
      alert("Please fill all fields before adding an entry!");
      return;
    }

    const newEntry = {
      id: Date.now(),
      type,
      amount: parseFloat(amount),
      description,
      linkedInvoice,
      date,
    };

    setEntries((prev) => [...prev, newEntry]);
    setType("Credit");
    setAmount("");
    setDescription("");
    setLinkedInvoice("");
    setDate("");
  };

  // ❌ Delete Entry
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // 💰 Ledger Summary
  const { totalCredit, totalDebit, balance } = useMemo(() => {
    const totalCredit = entries
      .filter((e) => e.type === "Credit")
      .reduce((sum, e) => sum + e.amount, 0);

    const totalDebit = entries
      .filter((e) => e.type === "Debit")
      .reduce((sum, e) => sum + e.amount, 0);

    const balance = totalCredit - totalDebit;
    return { totalCredit, totalDebit, balance };
  }, [entries]);

  return (
    <div className="space-y-6">
      {/* 🧾 Add Transaction Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Add Ledger Entry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Advance Payment"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Linked Invoice */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Link Invoice
            </label>
            <select
              value={linkedInvoice}
              onChange={(e) => setLinkedInvoice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            >
              <option value="">Select Invoice</option>
              {invoices.map((inv) => (
                <option key={inv} value={inv}>
                  {inv}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            Add Entry
          </button>
        </div>
      </form>

      {/* 📊 Ledger Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-xs">Total Credit</p>
          <h2 className="text-xl font-semibold text-green-600">
            ₹{totalCredit.toFixed(2)}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-xs">Total Debit</p>
          <h2 className="text-xl font-semibold text-red-600">
            ₹{totalDebit.toFixed(2)}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-xs">Balance</p>
          <h2
            className={`text-xl font-semibold ${
              balance >= 0 ? "text-indigo-600" : "text-red-600"
            }`}
          >
            ₹{balance.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* 📄 Ledger Entries Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr className="bg-indigo-100 text-gray-700">
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((e) => (
                <tr key={e.id} className="border-b hover:bg-gray-50 transition">
                  <td
                    className={`p-3 font-medium ${
                      e.type === "Credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {e.type}
                  </td>
                  <td className="p-3">₹{e.amount.toFixed(2)}</td>
                  <td className="p-3">{e.description}</td>
                  <td className="p-3 text-gray-500">{e.linkedInvoice || "—"}</td>
                  <td className="p-3">{e.date}</td>
                  <td className="p-3 text-center">
                    <i
                      className="ri-delete-bin-6-line text-red-500 text-lg cursor-pointer hover:text-red-700 transition"
                      onClick={() => handleDelete(e.id)}
                      title="Delete Entry"
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
                  No ledger entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
