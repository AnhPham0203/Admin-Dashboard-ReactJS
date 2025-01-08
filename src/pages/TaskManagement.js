import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { title, description, status, createdAt, assignedTo } = task;
  // console.log("===task===", task.assignedTo.username);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem("userRole"));
    console.log("Stored Role:", storedRole);
    if (storedRole) {
      // setIsAuthenticated(true);
      setUserRole(storedRole);
    }
    // setIsLoading(false); // Cập nhật loading state
  }, []);

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
        <p className="text-gray-600">{assignedTo?.username || ""}</p>
        {/* <p className="text-gray-600">{assignedTo.email}</p> */}
      </div>
      <div className="mt-4 flex space-x-2">
        {userRole !== "user" && userRole !== "admin" && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  onDelete(task.id);
                }
              }}
              className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
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

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem("userRole"));
    console.log("Stored Role:", storedRole);
    if (storedRole) {
      // setIsAuthenticated(true);
      setUserRole(storedRole);
    }
    // setIsLoading(false); // Cập nhật loading state
  }, []);

  const API_URL_GET_TASKS = "http://localhost:5000/tasks";
  const API_URL_POST_TASK = "http://localhost:5000/tasks";
  const API_URL_UPDATE_TASK = "http://localhost:5000/tasks";
  const API_URL_DELTE_TASK = "http://localhost:5000/tasks";
  const API_URL_GET_USERS = "http://localhost:5000/users/role-user";
  // Mock API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_GET_TASKS, {
          withCredentials: true,
        });
        // console.log("===Dt====", response.data);

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      try {
        const response = await axios.get(API_URL_GET_USERS, {
          withCredentials: true,
        });
        // console.log("===user====", response.data);

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    // const mockUsers = [
    //   { id: 1, username: "newUser" },
    //   { id: 2, username: "anotherUser" },
    // ];

    fetchData();
  }, []);

  const handleAddOrEditTask = async () => {
    if (currentTask) {
      const updatedTask = {
        ...formData,
        // id: currentTask.id, // Lấy id từ currentTask
      };
      try {
        console.log("===formData==", formData);
        const response = await axios.put(
          `${API_URL_DELTE_TASK}/${currentTask.id}`,
          updatedTask
        );
        console.log("put", response.data);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === currentTask.id ? response.data : task
          )
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      try {
        console.log("===formData==", formData);
        // debugger
        const response = await axios.post(API_URL_POST_TASK, formData);
        // console.log("===Dt====", response.data);
        setTasks((prevTasks) => [...prevTasks, response.data]);
        // setTasks(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    resetForm();
  };

  const handleEdit = (task) => {
    console.log("====task===", task);

    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      assignedTo: task.assignedTo.id,
    });

    setShowModal(true);
  };

  const handleDelete = async (taskId) => {
    try {
      console.log("===taskId==", taskId);
      const numericTaskId = parseInt(taskId, 10);
      // debugger
      const response = await axios.delete(
        `${API_URL_DELTE_TASK}/${numericTaskId}`
      );
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== numericTaskId)
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
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
        task.title &&
        task.title.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === "" || task.status === filterStatus)
    );
    setFilteredTasks(result);
  }, [search, filterStatus, tasks]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

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
      {userRole !== "user" && userRole !== "admin" && (
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Task
        </button>
      )}

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
                setFormData({
                  ...formData,
                  assignedTo: parseInt(e.target.value, 10),
                })
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
