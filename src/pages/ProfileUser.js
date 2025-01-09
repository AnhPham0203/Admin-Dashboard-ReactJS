import React, { useState, useEffect } from "react";
import axios from "axios";
const Profile = () => {
  // Dữ liệu người dùng ban đầu
  const [user, setUser] = useState({
    username: "DungTran",
    email: "user@gmail.com",
    age: 23,
    gender: "m",
    role: "user",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/3");
        console.log(response.data);

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // State để kiểm tra xem form chỉnh sửa có đang mở không
  const [isEditing, setIsEditing] = useState(false);

  // State để lưu tạm thông tin người dùng khi chỉnh sửa
  const [editedUser, setEditedUser] = useState({ ...user });

  // Xử lý thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Xử lý lưu thông tin
  const handleSave = () => {
    setUser({ ...editedUser }); // Cập nhật thông tin người dùng
    setIsEditing(false); // Đóng form chỉnh sửa
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-[32rem] p-8">
        <div className="text-center">
          {/* Ảnh đại diện */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center text-5xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>
          {/* Tên và vai trò */}
          <h1 className="mt-6 text-3xl font-bold text-gray-800">
            {user.username}
          </h1>
          {/* <p className="text-sm text-gray-500 capitalize">{user.role}</p> */}
        </div>
        {/* Hiển thị thông tin hoặc form chỉnh sửa */}
        {isEditing ? (
          <div className="mt-8">
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                Age:
              </label>
              <input
                type="number"
                name="age"
                value={editedUser.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                Gender:
              </label>
              <select
                name="gender"
                value={editedUser.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="m">Male</option>
                <option value="f">Female</option>
              </select>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Age:</span>
              <span className="text-gray-800">{user.age}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Gender:</span>
              <span className="text-gray-800">
                {user.gender === "m" ? "Male" : "Female"}
              </span>
            </div>
            <button
              className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
