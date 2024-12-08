

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    roomNo: "",
    phoneNo: "",
  });
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2((prev) => !prev);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // console.log(formData)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.role === "") {
      setError("Please select a role");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/v1/users/signup",
        formData,
        { withCredentials: true }
      );

      toast.success("Successfully registered!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="flex border rounded focus:outline-none focus:border-[#640F12]">
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-t-0 border-r-0"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            >
            {isPasswordVisible ? (
              <i className="fas fa-eye-slash mr-4"></i> // Replace with your preferred icon library
            ) : (
              <i className="fas fa-eye mr-4"></i> // Replace with your preferred icon library
            )}
          </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <div className="flex border rounded focus:outline-none focus:border-[#640F12]">
          <input
            type={isPasswordVisible2 ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-t-0 border-r-0"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility2}
            >
            {isPasswordVisible2 ? (
              <i className="fas fa-eye-slash mr-4"></i> // Replace with your preferred icon library
            ) : (
              <i className="fas fa-eye mr-4"></i> // Replace with your preferred icon library
            )}
          </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="normal_user">Faculty</option>
            <option value="electric_jd">Electric JE</option>
            <option value="plumbing_jd">Plumbing JE</option>
            <option value="carpentry_jd">Carpentry JE</option>
            <option value="networking_jd">Networking JE</option>
            {/* <option value="admin">Admin</option> */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Room No</label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Mobile No</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            maxlength="10"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#640F12] text-white py-2 rounded hover:bg-[#8b1a1f] transition-colors"
        >
          Sign Up
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
