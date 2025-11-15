import React, { useState } from "react";

export default function ProjectDocumentsTab() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Contract");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Handle file upload
  const handleUpload = (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Please fill in the title and choose a file before uploading.");
      return;
    }

    const newDoc = {
      id: Date.now(),
      title,
      type,
      fileName: file.name,
      version: 1,
      date: new Date().toLocaleDateString(),
    };

    setDocuments((prev) => [...prev, newDoc]);

    // Reset form
    setTitle("");
    setType("Contract");
    setFile(null);
  };

  // Handle version update
  const handleVersionUpdate = (id) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, version: doc.version + 1, date: new Date().toLocaleDateString() }
          : doc
      )
    );
  };

  // Handle file download (simulation)
  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="space-y-6">
      {/* 🧾 Upload Form */}
      <form
        onSubmit={handleUpload}
        className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm space-y-3"
      >
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Upload New Document
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-400"
            />
          </div>

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
              <option value="Contract">Contract</option>
              <option value="Invoice">Invoice</option>
              <option value="Proposal">Proposal</option>
              <option value="Report">Report</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Upload File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            Upload Document
          </button>
        </div>
      </form>

      {/* 📄 Uploaded Documents Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr className="bg-indigo-100 text-gray-700">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">File Name</th>
              <th className="p-3 text-left">Version</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{doc.title}</td>
                  <td className="p-3">{doc.type}</td>
                  <td className="p-3">{doc.fileName}</td>
                  <td className="p-3 text-indigo-600 font-medium">
                    v{doc.version}
                  </td>
                  <td className="p-3">{doc.date}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    {/* ⬇️ Download */}
                    <i
                      className="ri-download-2-line text-green-600 text-lg cursor-pointer hover:text-green-800 transition"
                      onClick={() => handleDownload(doc.fileName)}
                      title="Download"
                    ></i>

                    {/* 🔁 Version Update */}
                    <i
                      className="ri-refresh-line text-indigo-600 text-lg cursor-pointer hover:text-indigo-800 transition"
                      onClick={() => handleVersionUpdate(doc.id)}
                      title="New Version"
                    ></i>

                    {/* ❌ Delete */}
                    <i
                      className="ri-delete-bin-6-line text-red-500 text-lg cursor-pointer hover:text-red-700 transition"
                      onClick={() =>
                        setDocuments((prev) =>
                          prev.filter((d) => d.id !== doc.id)
                        )
                      }
                      title="Delete Document"
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
                  No documents uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
