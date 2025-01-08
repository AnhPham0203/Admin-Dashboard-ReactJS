import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom"; // Dùng useNavigate để điều hướng
import axios from "axios";
import requestApi from "../helpers/api";
import { jwtDecode } from "jwt-decode";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  axios.defaults.withCredentials = true; // Bật chế độ gửi cookie

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log("===OOKOK===", response.data);

      if (response.status === 201) {
        const { role } = response.data; // Lấy role từ response
        
        console.log("Đăng nhập thành công với role:", role.name);
        localStorage.setItem("userRole", JSON.stringify(role.name));
        setIsAuthenticated(true);
        setUserRole(userRole); // Lưu role vào state
        navigate("/admin-dashboard/"); // Điều hướng sau khi đăng nhập thành công
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response?.data?.message || error.message
      );
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            <span
              onClick={() => navigate("/verify-email")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
