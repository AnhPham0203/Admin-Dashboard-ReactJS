import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Thêm useHistory để điều hướng

const Sidebar = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập
  const navigate  = useNavigate(); // Dùng để điều hướng trang

  const menuItems = [
    {
      name: "Admin",
      path: "/admin",
      subModules: [
        { name: "Admin Management", path: "/admin" },
        { name: "Report Task List", path: "/tasks" },
        { name: "Report User", path: "/users" },
      ],
    },
    {
      name: "Permissions",
      path: "/permissions",
      subModules: [{ name: "Role", path: "/roles" }],
    },
    {
      name: "User",
      path: "/user-management",
      subModules: [{ name: "User Management", path: "/user-management" }],
    },
    {
      name: "Task",
      path: "/task-management",
      subModules: [{ name: "Task Management", path: "/task-management" }],
    },
  ];

  const handleModuleClick = (moduleName) => {
    setActiveModule(activeModule === moduleName ? null : moduleName);
  };

  const handleLoginClick = () => {
    navigate("/login"); // Điều hướng tới trang Login
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Điều hướng tới trang Register
  };

  return (
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
                    <NavLink
                      to={subItem.path}
                      className="block px-6 py-3 text-gray-400 hover:text-white"
                      activeClassName="bg-gray-700 font-bold text-white"
                    >
                      {subItem.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>


       {/* Phần Login / Register */}
       <div className="px-6 py-3 border-t border-gray-700">
        {!isAuthenticated ? (
          <div>
            <button
              onClick={handleLoginClick}
              className="w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded mb-2"
            >
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              className="w-full text-center py-2 px-4 bg-green-600 hover:bg-green-700 rounded"
            >
              Register
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthenticated(false)} // Giả lập đăng xuất
            className="w-full text-center py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
