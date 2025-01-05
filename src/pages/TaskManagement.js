import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { title, description, status, createdAt, assignedTo } = task;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-200 text-green-800";
      case "In Progress":
        return "bg-yellow-200 text-yellow-800";
      case "Pending":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <span
        className={`inline-block mt-4 px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
          status
        )}`}
      >
        {status}
      </span>
      <p className="text-sm text-gray-500 mt-2">
        Created At: {new Date(createdAt).toLocaleDateString()}
      </p>
      <div className="mt-4">
        <h3 className="font-medium text-gray-700">Assigned To:</h3>
        <p className="text-gray-600">{assignedTo.username}</p>
        <p className="text-gray-600">{assignedTo.email}</p>
      </div>
      <div className="mt-4 flex spec-x-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this task?")) {
              onDelete(task.id);
            }
          }}
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const API_URL = "http://localhost:5000/tasks";
  // Mock API call
  useEffect(() => {
    // const mockData = [
    //   {
    //     id: 1,
    //     title: "Fix UI Bugs",
    //     description: "Resolve issues with the UI components.",
    //     status: "In Progress",
    //     createdAt: "2025-01-02T08:00:00Z",
    //     assignedTo: { username: "Alice", email: "alice@example.com" },
    //   },
    //   {
    //     id: 2,
    //     title: "Implement Authentication",
    //     description: "Add login and signup functionality.",
    //     status: "Completed",
    //     createdAt: "2025-01-01T12:00:00Z",
    //     assignedTo: { username: "Bob", email: "bob@example.com" },
    //   },
    // ];
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL, { withCredentials: true });
        console.log("===Dt====", response.data);

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const mockUsers = [
      { id: 1, username: "newUser" },
      { id: 2, username: "anotherUser" },
    ];
    setUsers(mockUsers);

    fetchUsers();
  }, []);

  const handleAddOrEditTask = () => {
    if (currentTask) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id ? { ...currentTask, ...formData } : task
        )
      );
    } else {
      // Add new task
      const selectedUser = users.find(
        (user) => user.id === parseInt(formData.assignedTo)
      );

      const newTask = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        assignedTo: selectedUser
          ? { username: selectedUser.username, email: selectedUser.email }
          : { username: "Unknown", email: "default@example.com" }, // Default in case no user is selected
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    resetForm();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setShowModal(true);
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const resetForm = () => {
    setCurrentTask(null);
    setFormData({ title: "", description: "", status: "Pending" });
    setShowModal(false);
  };

   // Filter and search logic
   useEffect(() => {
    let result = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "" || task.status === filterStatus)
    );
    setFilteredTasks(result);
  }, [search, filterStatus, tasks]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>


       {/* Search and Filter */}
       <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="p-2 border border-gray-300 rounded-md w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Nút mở modal */}
      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              {currentTask ? "Edit Task" : "Add New Task"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {/* Assign User */}
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={formData.assignedTo || ""}
              onChange={(e) =>
                setFormData({ ...formData, assignedTo: e.target.value })
              }
            >
              <option value="">Assign to User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditTask}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                {currentTask ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách Task */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;
