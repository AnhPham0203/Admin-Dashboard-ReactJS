import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AdminManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    username: "",
    age: "",
    gender: "",
  });
  const [userRole, setUserRole] = useState(null);

  const API_URL = "http://localhost:5000/users/admin";
  const API_URL_ADD_ADMIN = "http://localhost:5000/users/create-admin";
  const API_URL_DELETE_ADMIN = "http://localhost:5000/users";
  const API_URL_UPDATE_USER = "http://localhost:5000/users";

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      const storedRole = JSON.parse(localStorage.getItem("userRole"));
      console.log("Stored Role:", storedRole);
      if (storedRole) {
        // setIsAuthenticated(true);
        setUserRole(storedRole);
      }
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
        console.log("===admin===", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Open modal
  const openModal = (user = null) => {
    setModalOpen(true);
    if (user) {
      setEditing(true);
      setFormData(user);
    } else {
      setEditing(false);
      setFormData({ id: null, username: "", age: "", gender: "" });
    }
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or edit user
  const handleSave = async () => {
    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      alert("New Password and Confirm New Password do not match!");
      return;
    }
    try {
      if (editing) {
        // Edit user
        const response = await axios.put(
          `${API_URL_UPDATE_USER}/${formData.id}`,
          formData
        );
        setUsers((prev) =>
          prev.map((user) =>
            user.id === response.data.id ? response.data : user
          )
        );
      } else {
        // Add user
        const response = await axios.post(API_URL_ADD_ADMIN, formData);
        debugger;
        console.log("==ADMIN===", response.data);

        setUsers((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL_DELETE_ADMIN}/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      {/* Add Admin Button */}
      {userRole === "manager" && (
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Add Admin
        </button>
      )}

      {/* Users Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            {/* <th className="border border-gray-300 px-4 py-2">Role</th> */}
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              {/* <td className="border border-gray-300 px-4 py-2">{user.role}</td> */}
              <td className="border border-gray-300 px-4 py-2">
                {userRole === "manager" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-semibold mb-4">
              {editing ? "Edit Admin" : "Add Admin"}
            </h3>

            <div className="flex flex-col gap-4">
              {/* Username */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {/* Conditional password fields */}
              {!editing && (
                <>
                  {/* Password */}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />

                  {/* Confirm Password */}
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                </>
              )}

              {editing && (
                <>
                  {/* Old Password */}
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />

                  {/* New Password */}
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />

                  {/* Confirm New Password */}
                  <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                </>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;
