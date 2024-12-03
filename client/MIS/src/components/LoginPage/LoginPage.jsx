/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/Auth";

function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "faculty",
  });
  const { setUser } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login",
        input
      );
      console.log("HELLO")
      setUser(response.data.user);

      // Redirect based on role
      if (input.role === "faculty") {
        navigate("/faculty/dashboard");
      } else if (input.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid Credentials");
    }
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setError(null);
  };

  return (
    <div className="flex justify-center items-center m-auto w-[100vw] min-h-[100vh]">
      <div className="min-w-[30%] p-8 bg-white shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640f12]"
              value={input.email}
              onChange={changeHandler}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640f12]"
              value={input.password}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="mb-4">
            <select
              name="role"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640f12]"
              value={input.role}
              onChange={changeHandler}
              required
            >
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="text-sm mb-5">
            <Link
              to="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#640f12] text-white p-3 rounded-md hover:bg-[#4a0b0e] transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <Link to="/signup" className="text-[#640f12] hover:underline">
            Signup here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
