import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Routes, Route, Link, Outlet } from "react-router-dom";
import AdminManagement from "../pages/AdminManagement";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../authProvider/AuthProvider";
import axios from "axios";

const Sidebar = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false); // State để hiển thị modal
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    role: "",
    avatar: "",
  });
  const navigate = useNavigate();

  // const { userRole } = useAuth()

  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem("userRole"));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored Role:=== sidebar", storedUser);
    if (storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setUserDetails(storedUser);
    }
    // setIsLoading(false); // Cập nhật loading state
  }, []);

  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);

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
          rolesAllowed: ["manager"],
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
          rolesAllowed: ["admin", "manager"],
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

  const handleProfileClick = () => {
    setShowProfileModal(true); // Mở modal
  };

  const handleModalClose = () => {
    setShowProfileModal(false); // Đóng modal
  };
  const handleEditClick = () => {
    setIsEditing(false); // Bật chế độ chỉnh sửa
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Logic chỉnh sửa thông tin người dùng
    console.log("Updated user details:", userDetails);
    setShowProfileModal(false);
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
    localStorage.removeItem("user");
    // localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleAvatarUpload = async (file) => {
    // debugger;
    console.log(file);

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", userDetails.id);
    //"http://localhost:5000/upload/avatar"
    try {
      const response = await axios.post(
        "http://localhost:5000/upload/avatar",
        formData
      );

      console.log("=====uploadAvatar==", response);
      // debugger;
      if (response.status === 201) {
        const newAvatarPath = response.data;

        setUserDetails((prevDetails) => {
          const updatedDetails = { ...prevDetails, avatar: newAvatarPath };
          // Cập nhật thông tin avatar mới vào localStorage
          localStorage.setItem("user", JSON.stringify(updatedDetails));
          return updatedDetails;
        });

        console.log("Avatar uploaded successfully!");
      } else {
        console.error("Failed to upload avatar.");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
    setShowProfileModal(false);
  };

  const handleAvatarClick = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện lan truyền
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("handleFileChange==", file);

    if (file) {
      setAvatar(URL.createObjectURL(file)); // Hiển thị avatar tạm thời
      handleAvatarUpload(file); // Gửi file lên server
    }
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
        {/* Profile Section */}
        <div
          className="border-b border-gray-700 px-6 py-4 flex items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
            {userDetails.avatar ? (
              <img
                src={`http://localhost:5000${userDetails.avatar}`}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              userDetails.username?.charAt(0).toUpperCase()
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{userDetails.username}</h3>
            <p className="text-sm text-gray-400">Role: {userRole || "N/A"}</p>
          </div>
        </div>

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

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            {isEditing ? (
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    type="text"
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        username: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Role</label>
                  <input
                    type="text"
                    value={userDetails.role}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div>
                {/* <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                  {userDetails.username?.charAt(0).toUpperCase()}
                </div> */}

                <div className="mb-2">
                  {/* <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">
                    {userDetails.username?.charAt(0).toUpperCase()}
                  </div> */}
                  <div
                    className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold cursor-pointer"
                    onClick={handleAvatarClick}
                    style={{
                      backgroundImage: avatar ? `url(${avatar})` : "",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!userDetails.avatar &&
                      userDetails.username?.charAt(0).toUpperCase()}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <p className="mb-2">
                  <strong>Username:</strong> {userDetails.username}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p className="mb-4">
                  <strong>Role:</strong> {userDetails.role}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={handleModalClose}
                    className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleAvatarUpload}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
