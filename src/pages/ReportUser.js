import React, { useState, useEffect } from "react";
import axios from "axios";
const ReportUser = () => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);

  // Giả lập lấy dữ liệu từ backend (dữ liệu mẫu)

  useEffect(() => {
    const fetchedReports = async () => {
      const storedRole = JSON.parse(localStorage.getItem("user"));
      console.log("Stored Role report:", storedRole);
      setUsers(storedRole)
      try {
        const response = await axios.get("http://localhost:5000/reports/user");
        console.log("===reports===", response.data);
        const data = response.data;
        setReports(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchedReports();
  }, []);

  const handleResolve = async (id) => {
    try {
      // Gửi yêu cầu POST tới backend với dữ liệu cần thiết
      const response = await axios.put(`http://localhost:5000/reports/${id}`, {
        status: "resolved",
        resolvedAt: new Date().toISOString(),
        resolvedById: users.id, // Bạn có thể thay thế bằng thông tin admin từ context hoặc state
      });

      // Nhận dữ liệu đã cập nhật từ backend
      const updatedReport = response.data;
      setReports(updatedReport);
      // Cập nhật state reports với báo cáo đã chỉnh sửa
      // setReports((prevReports) => {
      //   console.log("=== Before Update ===", prevReports);
      //   const updated = prevReports.map((report) =>
      //     report.id === updatedReport.id ? updatedReport : report
      //   );
      //   console.log("=== After Update ===", updated);
      //   return updated;
      // });
    } catch (error) {
      console.error("Error resolving report:", error);
      alert("Failed to resolve the report. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">User Report</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Reported User
            </th>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Reporter
            </th>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Reason
            </th>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Status
            </th>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Created At
            </th>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Resolved By
            </th>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Resolved At
            </th>
            <th className="py-2 px-4 border-b text-left text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="py-2 px-4 border-b text-gray-600">
                {typeof report.reportedUser === "string"
                  ? report.reportedUser
                  : "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                {typeof report.reporter === "string" ? report.reporter : "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                {report.reason}
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    report.status === "pending"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {report.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                {new Date(report.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                {report.resolvedBy || "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                {report.resolveddAt
                  ? new Date(report.resolveddAt).toLocaleString()
                  : "N/A"}
              </td>
              <td className="py-2 px-4 border-b text-gray-600">
                {report.status === "pending" && (
                  <button
                    onClick={() => handleResolve(report.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Resolve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportUser;
