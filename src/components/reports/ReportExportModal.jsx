import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

export default function ReportExportModal({ activeReport, onClose }) {
  const handlePDFExport = async () => {
    const table = document.getElementById("report-table");
    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, width, height);
    pdf.save(`${activeReport}_report.pdf`);
    onClose();
  };

  const handleExcelExport = () => {
    const table = document.getElementById("report-table");
    const rows = Array.from(table.querySelectorAll("tr")).map((tr) =>
      Array.from(tr.querySelectorAll("td,th")).map((td) => td.innerText)
    );
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${activeReport}_report.xlsx`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Export {activeReport} Report
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Choose a format to download your report.
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={handlePDFExport}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Export as PDF
          </button>
          <button
            onClick={handleExcelExport}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Export as Excel
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
