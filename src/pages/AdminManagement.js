import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;


const AdminManagement = () => {
  // Giả lập danh sách user
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    // role: "User",
  });
  
  const [editing, setEditing] = useState(false);

  // API base URL
  const API_URL = "http://localhost:5000/users/admin";
  // Lấy danh sách user từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await axios.get(API_URL,{withCredentials: true,} );
        console.log("===Dt====", response.data);
        
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Xử lý khi nhập vào form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm user mới
  const handleAddUser = async () => {


    try {
      const response = await axios.post(API_URL, {
        username: formData.username,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        // role: formData.role,
      });
      setUsers((prev) => [...prev, response.data]);
      setFormData({  name: "", email: "", role: "User" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Sửa user
  const handleEditUser = (user) => {
    setEditing(true);
    setFormData(user);
  };

  // Lưu sau khi chỉnh sửa
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${API_URL}/${formData.id}`, {
        name: formData.name,
        email: formData.email,
        // role: formData.role,
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === response.data.id ? response.data : user))
      );
      setEditing(false);
      setFormData({ id: null, name: "", email: "", role: "User" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Xóa user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      {/* Form thêm/sửa user */}
      {/* <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {editing ? "Edit User" : "Add User"}
        </h3>
        <div className="flex gap-4 mb-2">
          <input
            type="text"
            name="username"
            placeholder="UserName"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded w-1/3"
          />
          
        </div>
        <button
          onClick={editing ? handleSaveEdit : handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editing ? "Save" : "Add"}
        </button>
      </div> */}

      {/* Bảng danh sách user */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">UserName</th>
            {/* <th className="border border-gray-300 px-4 py-2">Email</th> */}
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              {/* <td className="border border-gray-300 px-4 py-2">{user.email}</td> */}
              <td className="border border-gray-300 px-4 py-2">{user.age}</td>
              <td className="border border-gray-300 px-4 py-2">{user.gender}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditUser(user)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManagement;
