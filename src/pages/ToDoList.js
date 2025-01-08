import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  // Lưu tasks vào localStorage mỗi khi chúng thay đổi
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
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
      {/* <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg transform"> */}
        <h1 className="text-2xl font-bold text-gray-700 mb-4">To-Do List</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border-b"
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

// import React, { useState } from "react";

// const TodoApp = () => {
//   const [todos, setTodos] = useState([
//     {
//       id: 1,
//       text: "Buy groceries for next week",
//       completed: true,
//       createdAt: "28th Jun 2020",
//       dueDate: null,
//     },
//     {
//       id: 2,
//       text: "Renew car insurance",
//       completed: false,
//       createdAt: "28th Jun 2020",
//       dueDate: "28th Jun 2020",
//     },
//     {
//       id: 3,
//       text: "Sign up for online course",
//       completed: false,
//       createdAt: "28th Jun 2020",
//       dueDate: null,
//     },
//   ]);
//   const [newTodo, setNewTodo] = useState("");
//   const [filter, setFilter] = useState("All");

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([
//         ...todos,
//         {
//           id: Date.now(),
//           text: newTodo,
//           completed: false,
//           createdAt: new Date().toLocaleDateString(),
//           dueDate: null,
//         },
//       ]);
//       setNewTodo("");
//     }
//   };

//   const toggleComplete = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === "Completed") return todo.completed;
//     if (filter === "Active") return !todo.completed;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-4xl p-6 bg-white rounded shadow-md">
//         <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">
//           My Todo-s
//         </h1>
//         <div className="flex items-center gap-3 mb-6">
//           <input
//             type="text"
//             className="flex-grow p-3 border border-gray-300 rounded"
//             placeholder="Add new..."
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={addTodo}
//           >
//             Add
//           </button>
//         </div>

//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <label className="mr-2 text-gray-500">Filter:</label>
//             <select
//               className="border border-gray-300 p-2 rounded"
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="All">All</option>
//               <option value="Completed">Completed</option>
//               <option value="Active">Active</option>
//             </select>
//           </div>
//         </div>

//         <ul className="space-y-4">
//           {filteredTodos.map((todo) => (
//             <li
//               key={todo.id}
//               className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded shadow-sm"
//             >
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={todo.completed}
//                   onChange={() => toggleComplete(todo.id)}
//                   className="mr-3"
//                 />
//                 <span
//                   className={`text-lg ${
//                     todo.completed ? "line-through text-gray-500" : ""
//                   }`}
//                 >
//                   {todo.text}
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 {todo.dueDate && (
//                   <span className="text-sm text-yellow-500">
//                     <i className="fas fa-hourglass-half mr-1"></i>
//                     {todo.dueDate}
//                   </span>
//                 )}
//                 <button
//                   onClick={() => deleteTodo(todo.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <i className="fas fa-trash-alt"></i>
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TodoApp;
