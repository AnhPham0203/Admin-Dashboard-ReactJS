import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {

 

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const navigate = useNavigate();


  
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (!code || !newPassword || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và mật khẩu xác nhận không khớp.");
      return;
    }

    // Giả sử bạn đã gửi yêu cầu đổi mật khẩu thành công
    // Thực tế bạn sẽ gọi API để thay đổi mật khẩu ở đây
    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        code,
        newPassword,
      });
      console.log(response.data);
      setSendMessage("")
    } catch (error) {
      console.log(error);
      
    }

    setSuccessMessage("Đổi mật khẩu thành công! Bạn có thể đăng nhập lại.");
    setError("");

    // Chuyển hướng người dùng về trang đăng nhập
    setTimeout(() => {
      navigate("/login");
    }, 2000); // Chờ 2 giây để người dùng thấy thông báo thành công
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Change your Password</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        {sendMessage && <p className="text-green-600 text-center mb-4">{sendMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Remember your password? 
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
