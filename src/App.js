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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kiểm tra đăng nhập
  const [userRole, setUserRole] = useState(""); // Lưu role người dùng

  // Kiểm tra trạng thái đăng nhập từ localStorage khi load lại trang
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role); // Lưu role của người dùng
    }
  }, []);

  const handleLogin = (role) => {
  
    // Sau khi đăng nhập thành công, lưu thông tin người dùng vào localStorage
    localStorage.setItem("user", JSON.stringify({ role }));

    setIsAuthenticated(true);
    setUserRole(role); // Lưu role của người dùng
    console.log("role= ", role);
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập và role khi logout
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserRole(""); // Xóa role
  };

  // PrivateRoute component để bảo vệ các route
  const PrivateRoute = ({ children, role }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (role && role !== userRole) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Route cho trang chủ (Sản phẩm) */}
        <Route path="/" element={<Login />} />

        <Route path="/todo-list" element={<ToDoList />} />

        {/* Route cho trang Login */}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />

        {/* Route cho trang Register */}
        <Route path="/register" element={<Register />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/verify-code" element={<VerifyCode />} />

        {/* Route cho trang Forgot Password */}
        <Route path="/reset-password" element={<ForgotPassword />} />

        <Route path="/admin-dashboard/*" element={<Sidebar />}>
          {/* Các route con hiển thị trong Content Area */}
          <Route path="admin-management" element={<AdminManagement />} />
          <Route path="task-management" element={<TaskManagement />} />
          
        </Route>

      
        {/* <Route path="admin-manage" element={<AdminManagement />}/> */}
        

        {/* Route cho Admin Management */}
        {/* <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminManagement />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
