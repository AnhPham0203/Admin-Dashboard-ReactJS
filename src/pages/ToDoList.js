import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const [creator, setCreator] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  // Lưu tasks vào localStorage mỗi khi chúng thay đổi
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() && creator.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: task,
          creator: creator,
          createdDate: new Date().toLocaleString(),
          completed: false,
        },
      ]);
      setTask("");
      setCreator("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex py-10 justify-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg transform max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">To-Do List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task..."
          />
          <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className="ml-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Creator name..."
          />
          <button
            onClick={addTask}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col p-2 border-b"
            >
              {editingTaskId === task.id ? (
                <div className="flex items-center w-full">
                  <input
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={saveEdit}
                    className="ml-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="ml-2 px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span
                      onClick={() => toggleComplete(task.id)}
                      className={`flex-1 cursor-pointer ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                    <div>
                      <button
                        onClick={() => startEditing(task.id, task.text)}
                        className="mr-2 text-blue-500 hover:text-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <p>Creator: {task.creator}</p>
                    <p>Created At: {task.createdDate}</p>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
