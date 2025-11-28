import React, { useState } from "react";
import {
  RiUpload2Line,
  RiDownload2Line,
  RiRefreshLine,
  RiDeleteBin6Line,
} from "react-icons/ri";

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
      date: new Date().toLocaleDateString(),
    };

    setDocuments((prev) => [...prev, newDoc]);

    setTitle("");
    setType("Contract");
    setFile(null);
  };

  // Handle file download
  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
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
              <option value="Other">Other</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="flex flex-col">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              File
            </label>

            <label className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-100 transition">
              <RiUpload2Line className="text-xl text-indigo-600" />
              <span className="text-sm text-gray-700">
                {file ? file.name : "Choose File"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
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

      {/* Documents Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr className="bg-indigo-100 text-gray-700">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">File Name</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{doc.date}</td>
                  <td className="p-3">{doc.title}</td>
                  <td className="p-3">{doc.type}</td>
                  <td className="p-3">{doc.fileName}</td>

                  {/* Action Icons */}
                  <td className="p-3 text-center flex justify-center gap-4">
                    <RiDownload2Line
                      className="text-green-600 text-xl cursor-pointer hover:text-green-800 transition"
                      onClick={() => handleDownload(doc.fileName)}
                      title="Download"
                    />

                    <RiDeleteBin6Line
                      className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition"
                      onClick={() =>
                        setDocuments((prev) =>
                          prev.filter((d) => d.id !== doc.id)
                        )
                      }
                      title="Delete Document"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4 text-sm">
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
