import React, { useState, useEffect } from "react";

const ReportUser = () => {
  const [reports, setReports] = useState([]);

  // Giả lập lấy dữ liệu từ backend (ở đây là dữ liệu mẫu)
  useEffect(() => {
    const fetchedReports = [
      {
        id: 1,
        reportedUser: {
          role: {
            id: 1,
            name: "user",
          },
        },
        reporter: {
          role: {
            id: 1,
            name: "user",
          },
        },
        reason: "Spamming messages2XXX",
        status: "pending",
        createdAt: "2025-01-06T10:26:42.373Z",
      },
    ];
    setReports(fetchedReports);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">User Report</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left text-gray-700">Reported User</th>
            <th className="py-2 px-4 border-b text-left text-gray-700">Reporter</th>
            <th className="py-2 px-4 border-b text-left text-gray-700">Reason</th>
            <th className="py-2 px-4 border-b text-left text-gray-700">Status</th>
            <th className="py-2 px-4 border-b text-left text-gray-700">Created At</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="py-2 px-4 border-b text-gray-600">{report.reportedUser.role.name}</td>
              <td className="py-2 px-4 border-b text-gray-600">{report.reporter.role.name}</td>
              <td className="py-2 px-4 border-b text-gray-600">{report.reason}</td>
              <td className="py-2 px-4 border-b text-gray-600">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    report.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  {report.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                {new Date(report.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportUser;
