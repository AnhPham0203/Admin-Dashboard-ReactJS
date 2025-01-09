import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState();
  const [tasks, setTasks] = useState();
  const [roles, setRoles] = useState();

  const API_URL = "http://localhost:5000/users";
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await axios.get(API_URL);
        const roles = await axios.get("http://localhost:5000/roles");
        const tasks = await axios.get("http://localhost:5000/tasks");
        console.log(users.data);

        setUsers(users.data.length);
        setRoles(roles.data.length);
        setTasks(tasks.data.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  //   fetchStats();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
           Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card User */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <i className="fas fa-users text-blue-600 text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Users</h3>
            <p className="text-3xl font-bold text-gray-900">{users}</p>
          </div>

          {/* Card Task */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <i className="fas fa-tasks text-green-600 text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Tasks</h3>
            <p className="text-3xl font-bold text-gray-900">{tasks}</p>
          </div>

          {/* Card Role */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-300">
            <div className="bg-yellow-100 p-4 rounded-full mb-4">
              <i className="fas fa-user-shield text-yellow-600 text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Roles</h3>
            <p className="text-3xl font-bold text-gray-900">{roles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
