import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import { useAuth } from "../../store/Auth"; // Import your auth context

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "normal_user", // Default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Use the context to set user

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData,
        { withCredentials: true }
      );

      // Assuming response.data contains user information
      const userData = response.data.user; // Adjust this based on your API response
      setUser(userData); // Update context with user data
      toast.success("Login successful!"); // Show success toast
      navigate("/profile"); // Navigate to the profile page
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed"); // Show error toast
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Log In</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          >
            <option value="normal_user">Normal User</option>
            <option value="electric_jd">Electric JD</option>
            <option value="plumbing_jd">Plumbing JD</option>
            <option value="carpentry_jd">Carpentry JD</option>
            <option value="networking_jd">Networking JD</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#640F12] text-white py-2 rounded hover:bg-[#8b1a1f] transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
