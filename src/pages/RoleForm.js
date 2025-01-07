import React, { useState } from "react";

const RoleForm = ({ onSubmit, initialData, onCancel }) => {
  const [role, setRole] = useState(
    initialData || {
      name: "",
      description: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(role);
    setRole({ name: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Role Name</label>
        <input
          type="text"
          name="name"
          value={role.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={role.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="flex justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {initialData ? "Update Role" : "Add Role"}
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
