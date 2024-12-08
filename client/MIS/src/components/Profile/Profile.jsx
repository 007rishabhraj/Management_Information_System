import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const rawData = localStorage.getItem("user");
  let user = null;
  if (rawData) user = JSON.parse(rawData);

  const [profile, setProfile] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          setProfile(user);
        } else {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/users/", {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
          setProfile(response.data);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[100vh]">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-semibold mb-6">Faculty Options</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/complain")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded">
              Complain
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => navigate("/feedback")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              Feedback
            </button>
          </li> */}
          <li>
            <button
              onClick={() => navigate("/jeInfo")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              All JE's List
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/user-history")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              History
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/previous-reviews")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              Previous Reviews 
            </button>
          </li>
        </ul>
      </div>

      {/* Profile Content */}
      <div className="w-full md:w-3/4 p-4 md:p-8 bg-gray-100">
        <div className="bg-white p-6 md:p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Your Profile</h2>
          <div className="flex justify-center mb-6">
            <img
              src={profile.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-300"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-semibold">Name:</h3>
            <p className="text-base md:text-lg p-3 border border-gray-300 rounded-md">
              {profile.username}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-semibold">Email:</h3>
            <p className="text-base md:text-lg p-3 border border-gray-300 rounded-md">
              {profile.email}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-semibold">Room No.:</h3>
            <p className="text-base md:text-lg p-3 border border-gray-300 rounded-md">
              {profile.roomNo}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-semibold">Contact:</h3>
            <p className="text-base md:text-lg p-3 border border-gray-300 rounded-md">
              +91 {profile.phoneNo}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/UpdateUser")}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
