import React, { useState, useEffect } from "react";
import axios from "axios";

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const API_URL = "http://localhost:5000/roles";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddRole = async (newRole) => {
    try {
      const response = await axios.post(API_URL, newRole);
      setRoles([...roles, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const handleEditRole = async (updatedRole) => {
    try {
      const response = await axios.put(
        `${API_URL}/${updatedRole.id}`,
        updatedRole
      );
      setRoles(
        roles.map((role) => (role.id === updatedRole.id ? response.data : role))
      );
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentRole(null);
    } catch (error) {
      console.error("Error editing role:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const openAddModal = () => {
    setCurrentRole(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (role) => {
    setCurrentRole(role);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentRole(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <button
        onClick={openAddModal}
        className="mb-4 bg-blue-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
      >
        Add Role
      </button>

      <table className="w-full bg-white shadow-md rounded-lg border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm font-semibold">
            <th className="p-4 border-b">ID</th>
            <th className="p-4 border-b text-left">Name</th>
            <th className="p-4 border-b text-left">Description</th>
            <th className="p-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr
              key={role.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition duration-200`}
            >
              <td className="p-4 border-b text-center text-gray-700 font-medium">
                {role.id}
              </td>
              <td className="p-4 border-b text-gray-800">{role.name}</td>
              <td className="p-4 border-b text-gray-600">{role.description}</td>
              <td className="p-4 border-b text-center">
                <button
                  onClick={() => openEditModal(role)}
                  className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="ml-3 bg-red-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onSubmit={isEditing ? handleEditRole : handleAddRole}
          initialData={isEditing ? currentRole : null}
        />
      )}
    </div>
  );
};

const Modal = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || { name: "", description: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Role" : "Add Role"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolePage;
