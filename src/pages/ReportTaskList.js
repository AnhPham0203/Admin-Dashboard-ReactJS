import React, { useState, useEffect } from "react";
import axios from "axios";

const ReportTaskList = () => {
  
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tasks, setTasks] = useState([]);


  const API_URL_GET_TASKS = "http://localhost:5000/tasks";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_GET_TASKS, {
          withCredentials: true,
        });
        // console.log("===Dt====", response.data);

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }

    };
  

    fetchData();
  }, []);

  

  // Tổng hợp thông tin
  const calculateSummary = () => {
    const totalTasks = filteredTasks.length;
    const statusSummary = filteredTasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { Pending: 0, "In Progress": 0, Completed: 0 }
    );
    return { totalTasks, statusSummary };
  };

  // Bộ lọc task theo search và status
  useEffect(() => {
    const result = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "" || task.status === filterStatus)
    );
    setFilteredTasks(result);
  }, [search, filterStatus, tasks]);

  const { totalTasks, statusSummary } = calculateSummary();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Report Task List</h1>

      {/* Bộ lọc */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          className="border border-gray-300 rounded-md p-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2 w-1/3"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Thông tin tổng hợp */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <ul className="list-disc list-inside">
          <li>Total Tasks: {totalTasks}</li>
          <li>Pending: {statusSummary.Pending}</li>
          <li>In Progress: {statusSummary["In Progress"]}</li>
          <li>Completed: {statusSummary.Completed}</li>
        </ul>
      </div>

      {/* Bảng hiển thị task */}
      {/* <div className="bg-white rounded-md shadow-md overflow-hidden">
      <table className="table-auto w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.description}</td>
              <td className="px-4 py-2">{task.status}</td>
              <td className="px-4 py-2">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(task.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No tasks match your criteria.
        </p>
      )}
    </div> */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full border-collapse table-fixed">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr
                key={task.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition`}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate">
                  {task.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 truncate">
                  {task.description}
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : task.status === "In Progress"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {task.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {task.updatedAt
                    ? new Date(task.updatedAt).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No tasks match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportTaskList;
