import  { useState } from "react";
import axios from "axios";

function ComplainForm() {
  const [complain, setComplain] = useState({
    location: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toLocaleTimeString(),
    resolved: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/complains",
        complain
      );
      console.log("Complain submitted:", response.data);
      // Reset form after submission
      setComplain({
        location: "",
        description: "",
        date: new Date().toISOString().slice(0, 10),
        time: new Date().toLocaleTimeString(),
        resolved: false,
      });
    } catch (error) {
      console.error("Error submitting complain", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComplain((prevComplain) => ({
      ...prevComplain,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center m-auto w-[100vw] min-h-[100vh] p-4 bg-gray-100">
      <div className="min-w-[50%] p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Submit a Complain
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-lg font-medium mb-2"
            >
              Location:
            </label>
            <select
              id="location"
              name="location"
              value={complain.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Home">Home</option>
              <option value="Department">Department</option>
              <option value="Hostel">Hostel</option>
              <option value="Campus">Campus</option>
              <option value="Lecture Hall">Lecture Hall</option>
            </select>
            <label
              htmlFor="location"
              className="block text-lg font-medium mb-2"
            >
              Regarding:
            </label>
            <select
              id="location"
              name="location"
              value={complain.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Categories
              </option>
              <option value="Home">Plumping</option>
              <option value="Department">Electrical</option>
              <option value="Hostel">Civil</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={complain.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your complain here..."
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit Complain
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplainForm;
