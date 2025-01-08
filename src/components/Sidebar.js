import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Routes, Route, Link, Outlet } from "react-router-dom";
import AdminManagement from "../pages/AdminManagement";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../authProvider/AuthProvider";

const Sidebar = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // const { userRole } = useAuth()

  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem("userRole"));
    console.log("Stored Role:", storedRole);
    if (storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
    // setIsLoading(false); // Cập nhật loading state
  }, []);

  const menuItems = [
    {
      name: "Admin",
      roleRequired: "admin",
      subModules: [
        {
          name: "Admin Management",
          path: "/admin-dashboard/admin-management",
          rolesAllowed: ["admin", "manager"],
        },
        {
          name: "Report Task List",
          path: "/admin-dashboard/tasks-report",
          rolesAllowed: ["admin", "manager"],
        },
        {
          name: "Report User",
          path: "/admin-dashboard/users-report",
          rolesAllowed: ["admin", "manager"],
        },
      ],
    },
    {
      name: "Permissions",
      roleRequired: "admin",
      subModules: [
        {
          name: "Role",
          path: "/admin-dashboard/roles",
          rolesAllowed: ["admin", "manager"],
        },
        // { name: "Role", path: "/roles", rolesAllowed: ["admin", "manager"] },
      ],
    },
    {
      name: "User",
      roleRequired: "user",
      subModules: [
        {
          name: "User Management",
          path: "/admin-dashboard/user-management",
          rolesAllowed: ["user", "admin", "manager"],
        },
      ],
    },
    {
      name: "Task",
      roleRequired: "manager",
      subModules: [
        {
          name: "Task Management",
          path: "/admin-dashboard/task-management",
          rolesAllowed: ["manager", "user", "admin"],
        },
      ],
    },
    {
      name: "To-Do List",
      roleRequired: "all", // To-Do List có thể dành cho tất cả các role
      subModules: [
        {
          name: "My To-Do List",
          path: "/admin-dashboard/todo-list",
          rolesAllowed: ["admin", "manager", "user"], // Quyền truy cập cho tất cả
        },
      ],
    },
  ];

  const handleModuleClick = (moduleName) => {
    setActiveModule(activeModule === moduleName ? null : moduleName);
  };

  const handleSubModuleClick = (path, rolesAllowed) => {
    // Chỉ điều hướng nếu userRole nằm trong rolesAllowed
    if (rolesAllowed.includes(userRole)) {
      if (path === "/admin-dashboard/user-management") {
        if (userRole === "user") {
          navigate("/admin-dashboard/profile");
        } else {
          navigate(path); // Điều hướng đến danh sách user cho admin/manager
        }
      } else {
        navigate(path);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl text-gray-600">
          Please log in to access the dashboard.
        </h2>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white">
        <h2 className="text-center text-2xl font-bold py-6 border-b border-gray-700">
          <Link to="/admin-dashboard/">Admin Dashboard</Link>
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
                        className={`block px-6 py-3 text-gray-400 hover:text-white cursor-pointer ${
                          !subItem.rolesAllowed.includes(userRole)
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }`}
                        onClick={() =>
                          handleSubModuleClick(
                            subItem.path,
                            subItem.rolesAllowed
                          )
                        }
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
        {/* <Dashboard></Dashboard> */}
        <Outlet />
      </div>
    </div>
  );
};
export default Sidebar;
