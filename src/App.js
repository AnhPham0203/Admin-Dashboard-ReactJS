

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Sidebar
import ToDoList from "./pages/ToDoList"; // Trang sản phẩm
import Login from "./auth/Login"; // Trang Login
import Register from "./auth/Register"; // Trang Register
import AdminManagement from "./pages/AdminManagement";
import ForgotPassword from "./auth/Reset-password";
import VerifyEmail from "./auth/VerifyEmail";
import VerifyCode from "./auth/VerifyCode";
import TaskManagement from "./pages/TaskManagement";
import ReportTaskList from "./pages/ReportTaskList";
import ReportUser from "./pages/ReportUser";
import RolePage from "./pages/Role";
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./authProvider/AuthProvider";
import ProfileUser from "./pages/ProfileUser";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kiểm tra đăng nhập
  const [userRole, setUserRole] = useState(null); // Để giá trị ban đầu là null
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  // Kiểm tra trạng thái đăng nhập từ localStorage khi load lại trang
  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem("userRole"));
    console.log("Stored Role:", storedRole);
    if (storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
    setIsLoading(false); // Cập nhật loading state
  }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>; // Hoặc một spinner
  // }

  // Component để bảo vệ các route
  // const PrivateRoute = ({ children, role }) => {
  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" />;
  //   }
  //   if (role && role !== userRole) {
  //     return <Navigate to="/" />; // Nếu không phải role admin, chuyển hướng về trang chủ
  //   }
  //   return children;
  // };

  return (
    // <AuthProvider>
      <Router>
        <Routes>
          {/* Route cho trang chủ (Sản phẩm) */}
          <Route path="/" element={<Login />} />

          <Route path="/todo-list" element={<ToDoList />} />

          {/* Route cho trang Login */}
          <Route path="/login" element={<Login />} />

          {/* Route cho trang Register */}
          <Route path="/register" element={<Register />} />

          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/verify-code" element={<VerifyCode />} />

          {/* Route cho trang Forgot Password */}
          <Route path="/reset-password" element={<ForgotPassword />} />

          {/* Route cho Admin Dashboard */}
          <Route
            path="/admin-dashboard/*"
            element={<Sidebar userRole={userRole} />}
          >
            {/* Các route con hiển thị trong Content Area */}
            <Route path="" element={<Dashboard />} />
            <Route path="admin-management" element={<AdminManagement />} />
            <Route path="tasks-report" element={<ReportTaskList />} />
            <Route path="users-report" element={<ReportUser />} />
            <Route path="roles" element={<RolePage />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="task-management" element={<TaskManagement />} />
            <Route path="todo-list" element={<ToDoList />} />
            <Route path="profile" element={<ProfileUser />} />
          </Route>
        </Routes>
      </Router>
    // </AuthProvider>
  );
};

export default App;
