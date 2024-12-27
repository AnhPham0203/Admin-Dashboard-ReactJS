import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate để điều hướng
import axios from "axios";
import requestApi from "../helpers/api";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

//   Xử lý khi submit form đăng nhập
//   const onSubmit = (e) => {
//     e.preventDefault();
    
//     const loginData= {username, password}
//     console.log(loginData)
//     // let valid = validateForm();
    
//         //request login api
//         console.log("request login api")
//         // dispatch(actions.controlLoading(true))
//         requestApi('auth/login', 'POST', loginData).then((res) => {
//             console.log(res)

//             // localStorage.setItem('access_token', res.data.access_token);
//             // localStorage.setItem('refresh_token', res.data.refresh_token);
//             // dispatch(actions.controlLoading(false))
//             navigate('/');
//         }).catch(err => {
//             // dispatch(actions.controlLoading(false))
//             console.log(err)
//             // if (typeof err.response !== "undefined") {
//             //     if (err.response.status !== 201) {
//             //         toast.error(err.response.data.message, { position: "top-center" })
//             //     }
//             // } else {
//             //     toast.error("Server is down. Please try again!", { position: "top-center" })
//             // }
//         })
//     }


        const onSubmit = async (e) => {
            console.log(email, password); //1
            e.preventDefault(); // Ngừng hành động mặc định của form (reload trang)
          
            try {
              // Gửi yêu cầu POST tới backend để đăng nhập
              const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password,
              });
              console.log(response.data); //2
          
              // Nếu đăng nhập thành công, xử lý kết quả từ server
              if (response.status === 201) {
                // Giả sử backend trả về một token hoặc thông tin người dùng
                // handleLogin(response.data); // Hàm handleLogin sẽ lưu thông tin đăng nhập
                navigate("/admin"); // Điều hướng tới trang dashboard hoặc trang chính
              }
            } catch (error) {
              // Xử lý lỗi nếu đăng nhập không thành công
              console.error("Error during login:", error); // Log chi tiết lỗi
              setError("Invalid username or password.");
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
              onClick={() => navigate("/forgot-password")}
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
