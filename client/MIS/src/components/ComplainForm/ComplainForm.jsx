import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth"; // Import the useAuth hook

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    department: "",
    description: "",
    availabilityStart: "",
    availabilityEnd: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user info from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Form validation
    const {
      department,
      description,
      availabilityStart,
      availabilityEnd,
      location,
    } = formData;
    if (
      !department ||
      !description ||
      !availabilityStart ||
      !availabilityEnd ||
      !location
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/complain",
        {
          department,
          description,
          availability: {
            start: new Date(availabilityStart), // Convert to Date object
            end: new Date(availabilityEnd), // Convert to Date object
          },
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Use token from the user context
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(response.data.message);
      // Redirect to the profile page after successful submission
      navigate("/profile");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error submitting complaint. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-brown-700 mb-4">
        Submit a Complaint
      </h2>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}
      {success && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-brown-700 mb-1" htmlFor="department">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select Department</option>
            <option value="electric">Electric</option>
            <option value="plumbing">Plumbing</option>
            <option value="carpentry">Carpentry</option>
            <option value="networking">Networking</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-brown-700 mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-brown-700 mb-1"
            htmlFor="availabilityStart"
          >
            Availability Start
          </label>
          <input
            type="datetime-local"
            id="availabilityStart"
            name="availabilityStart"
            value={formData.availabilityStart}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-brown-700 mb-1"
            htmlFor="availabilityEnd"
          >
            Availability End
          </label>
          <input
            type="datetime-local"
            id="availabilityEnd"
            name="availabilityEnd"
            value={formData.availabilityEnd}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-brown-700 mb-1" htmlFor="location">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select Location</option>
            <option value="lecture hall">Lecture Hall</option>
            <option value="home">Home</option>
            <option value="department">Department</option>
            <option value="hostel">Hostel</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#640F12] text-white py-2 rounded hover:bg-[#8b1a1f] transition-colors"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
