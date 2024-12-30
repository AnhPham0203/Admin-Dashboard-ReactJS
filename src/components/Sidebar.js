import React, { useState } from "react";
import { useNavigate, Routes, Route, Link, Outlet } from "react-router-dom";
import AdminManagement from "../pages/AdminManagement";

const Sidebar = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Giả sử người dùng đã đăng nhập
  const navigate = useNavigate(); // Dùng để điều hướng

  const menuItems = [
    {
      name: "Admin",
      subModules: [
        { name: "Admin Management", path: "/admin-dashboard/admin-manage" },
        { name: "Report Task List", path: "/tasks" },
        { name: "Report User", path: "/users" },
      ],
    },
    {
      name: "Permissions",
      subModules: [{ name: "Role", path: "/roles" }],
    },
    {
      name: "User",
      subModules: [{ name: "User Management", path: "/user-management" }],
    },
    {
      name: "Task",
      subModules: [{ name: "Task Management", path: "/task-management" }],
    },
  ];

  const handleModuleClick = (moduleName) => {
    setActiveModule(activeModule === moduleName ? null : moduleName);
  };

  const handleSubModuleClick = (path) => {
    navigate(path); // Điều hướng đến đường dẫn được chỉ định
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Đăng xuất
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl text-gray-600">Please log in to access the dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white">
        <h2 className="text-center text-2xl font-bold py-6 border-b border-gray-700">
          Admin Dashboard
        </h2>
        <ul className="mt-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {/* Module */}
              <div
                className="cursor-pointer px-6 py-3 hover:bg-gray-700 text-xl font-semibold text-gray-300"
                onClick={() => handleModuleClick(item.name)}
              >
                {item.name}
              </div>
              {/* Sub-modules */}
              {activeModule === item.name && (
                <ul className="ml-6">
                  {item.subModules.map((subItem, subIndex) => (
                    <li key={subIndex} className="hover:bg-gray-600">
                      <div
                        className="block px-6 py-3 text-gray-400 hover:text-white cursor-pointer"
                        onClick={() => handleSubModuleClick(subItem.path)}
                      >
                        {subItem.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {/* Logout Button */}
        <div className="px-6 py-3 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
        {/* Outlet will render the content of sub-routes */}
        <Outlet />
      </div>

     
    </div>
  );
};

export default Sidebar;
