import React from "react";

export default function ReportCard({ report, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md hover:border-indigo-400 transition transform hover:-translate-y-1"
    >
      <div className="flex items-center space-x-3">
        <i className={`${report.icon} text-2xl text-indigo-600`}></i>
        <div>
          <h3 className="text-gray-800 font-semibold">{report.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{report.description}</p>
        </div>
      </div>
    </div>
  );
}
