

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Sidebar
// import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard
import HomePage from "./pages/HomePage"; // Trang sản phẩm
import Login from "./auth/Login"; // Trang Login
import Register from "./auth/Register"; // Trang Register
import AdminManagement from "./pages/AdminManagement";
import ForgotPassword from "./auth/Forgot-password";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kiểm tra đăng nhập
  const [userRole, setUserRole] = useState(''); // Lưu role người dùng

  // Kiểm tra nếu đã đăng nhập từ trước khi load lại trang
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user) {
  //     setIsAuthenticated(true);
  //     setUserRole(user.role); // Lưu role của người dùng
  //   }
  // }, []);

  const handleLogin = (role) => {
    console.log("role= ", role);

    // Sau khi đăng nhập thành công, lưu thông tin người dùng vào localStorage
    localStorage.setItem("user", JSON.stringify({ role }));

    setIsAuthenticated(true);
    setUserRole(role); // Lưu role của người dùng
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập và role khi logout
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserRole(""); // Xóa role
  };

  return (
    <Router>
      <Routes>
        {/* Route cho trang chủ (Sản phẩm) */}
        <Route path="/" element={<HomePage />} />

        {/* Route cho trang Login */}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />

        {/* Route cho trang Register */}
        <Route path="/register" element={<Register />} />

        {/* Route cho trang forgot-password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* <Route path="/admin" element={<AdminManagement />} /> */}

        {/* Route cho Admin Dashboard */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              userRole === "admin" ? (
                <AdminManagement  />
              ) : (
                <Navigate to="/" /> // Nếu là user thì quay lại trang sản phẩm
              )
            ) : (
              <Navigate to="/login" /> // Nếu chưa đăng nhập thì chuyển tới trang login
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
