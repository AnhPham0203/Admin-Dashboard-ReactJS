import React, { useState, useEffect } from "react";
import RoleForm from "./RoleForm";
import axios from "axios";

const RolePage = () => {
  //   const [roles, setRoles] = useState([
  //     { id: 1, name: "admin", description: "manage everything", permissions: [] },
  //     { id: 2, name: "user", description: "manage admin", permissions: [] },
  //   ]);
  const [roles, setRoles] = useState([]);
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

  const handleAddRole = (newRole) => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
  };

  const handleEditRole = (updatedRole) => {
    setRoles(
      roles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
    setIsEditing(false);
    setCurrentRole(null);
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleEditClick = (role) => {
    setCurrentRole(role);
    setIsEditing(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <div className="mb-6">
        {!isEditing && <RoleForm onSubmit={handleAddRole} />}
        {isEditing && (
          <RoleForm
            initialData={currentRole}
            onSubmit={handleEditRole}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>
      <table className="w-full bg-white shadow-md rounded-lg border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm font-semibold">
            <th className="p-4 border-b">#</th>
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
                  onClick={() => handleEditClick(role)}
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
    </div>
  );
};

export default RolePage;
