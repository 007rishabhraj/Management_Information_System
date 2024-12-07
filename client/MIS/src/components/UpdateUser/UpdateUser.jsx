import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  if(!user)
  {
    return <p>You're not logged in</p>;
  }
  user = JSON.parse(user);
//   console.log(user)
  const [formData, setFormData] = useState({
    username: user.username,
    phoneNo: user.phoneNo || "",
    roomNo: user.roomNo || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Updated Details:", formData);
    try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/users/updateUser",
          {
            email : user.email,
            username : formData.username,
            roomNo : formData.roomNo,
            phoneNo : formData.phoneNo,
          },
          { 
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         }
        );
        user.username = formData.username;
        user.roomNo = formData.roomNo;
        user.phoneNo = formData.phoneNo;
        localStorage.setItem("user" , JSON.stringify(user))
        alert("Profile Successfully Edited")
        navigate("/profile");
      } catch (err) {
        console.error("Signup error:", err);
        setError(err.response?.data?.message || "Signup failed");
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-gray-600 mb-2">Phone</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleInputChange}
              maxlength="10"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Address */}
          <div>
            <label className="block text-gray-600 mb-2">Room No.</label>
            <input
              name="roomNo"
              value={formData.roomNo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
