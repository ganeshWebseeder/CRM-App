import React, { useState } from "react";

export default function ProjectInvoicesTab() {
  const [invoices, setInvoices] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [editInvoice, setEditInvoice] = useState(null);

  // 🧾 Create or Update Invoice
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!invoiceNumber || !clientEmail || !amount) {
      alert("Please fill in all required fields!");
      return;
    }

    const newInvoice = {
      id: editInvoice ? editInvoice.id : Date.now(),
      invoiceNumber,
      clientEmail,
      amount,
      status,
      version: editInvoice ? editInvoice.version + 1 : 1,
      date: new Date().toLocaleDateString(),
    };

    if (editInvoice) {
      // Update (new version)
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === editInvoice.id ? newInvoice : inv
        )
      );
      alert("Invoice updated (new version created)");
    } else {
      // Create new
      setInvoices((prev) => [...prev, newInvoice]);
      alert("Invoice created successfully");
    }

    // Reset form
    setInvoiceNumber("");
    setClientEmail("");
    setAmount("");
    setStatus("Pending");
    setEditInvoice(null);
  };

  // 📨 Email invoice (simulated)
  const handleEmail = (invoice) => {
    alert(`Invoice ${invoice.invoiceNumber} emailed to ${invoice.clientEmail}`);
  };

  // 🧾 Export PDF (simulated)
  const handleExportPDF = (invoice) => {
    alert(`Exporting Invoice ${invoice.invoiceNumber} to PDF...`);
  };

  // ✏️ Edit Invoice
  const handleEdit = (invoice) => {
    setInvoiceNumber(invoice.invoiceNumber);
    setClientEmail(invoice.clientEmail);
    setAmount(invoice.amount);
    setStatus(invoice.status);
    setEditInvoice(invoice);
  };

  // ❌ Delete Invoice
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 🧾 Create Invoice Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          {editInvoice ? "Modify Invoice (New Version)" : "Create New Invoice"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Invoice Number */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              placeholder="INV-001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          {/* Client Email */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Client Email
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
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

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            {editInvoice ? "Update Invoice" : "Create Invoice"}
          </button>
        </div>
      </form>

      {/* 📄 Invoices Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-3 text-left">Invoice #</th>
              <th className="p-3 text-left">Client Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Version</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="p-3">{invoice.clientEmail}</td>
                  <td className="p-3">₹{invoice.amount}</td>
                  <td
                    className={`p-3 font-semibold ${
                      invoice.status === "Paid"
                        ? "text-green-600"
                        : invoice.status === "Overdue"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {invoice.status}
                  </td>
                  <td className="p-3 text-indigo-600 font-medium">
                    v{invoice.version}
                  </td>
                  <td className="p-3">{invoice.date}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    {/* ✏️ Edit */}
                    <i
                      className="ri-edit-2-fill text-indigo-600 text-lg cursor-pointer hover:text-indigo-800 transition"
                      onClick={() => handleEdit(invoice)}
                      title="Edit / New Version"
                    ></i>

                    {/* 📤 Export PDF */}
                    <i
                      className="ri-file-download-line text-green-600 text-lg cursor-pointer hover:text-green-800 transition"
                      onClick={() => handleExportPDF(invoice)}
                      title="Export PDF"
                    ></i>

                    {/* 📧 Email */}
                    <i
                      className="ri-mail-send-line text-blue-500 text-lg cursor-pointer hover:text-blue-700 transition"
                      onClick={() => handleEmail(invoice)}
                      title="Email Invoice"
                    ></i>

                    {/* ❌ Delete */}
                    <i
                      className="ri-delete-bin-6-line text-red-500 text-lg cursor-pointer hover:text-red-700 transition"
                      onClick={() => handleDelete(invoice.id)}
                      title="Delete"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 py-4 text-sm"
                >
                  No invoices available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
