import { useState } from "react";

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      createdAt: new Date().toISOString(),
      assignedTo: { username: "Default User", email: "default@example.com" },
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setStatus("");
  };

  return (
    <form
      className="bg-white p-4 shadow-md rounded-md mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};
export default AddTaskForm;
