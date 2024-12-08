import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // Default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    if(localStorage.getItem("user")) navigate("/profile");
  },[])

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error

    try {
      // Handle Login
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.token);
      if (formData.role === "normal_user") {
        const userData = response.data.user;
        // console.log(response.data)
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/profile");
      } else {
        localStorage.setItem("admin", JSON.stringify({ jd: formData.role }));
        navigate("/admin");
      }
      toast.success("Login successful!"); // Show success toast
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed"); 
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
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
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

        <button
          type="submit"
          className="w-full bg-[#640F12] text-white py-2 rounded hover:bg-[#8b1a1f] transition-colors"
        >
          Log In
        </button>

        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")} // Navigate to the signup route
            className="text-[#640F12] cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
