import { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // If user is present in context, set profile to user directly
        if (user) {
          setProfile(user);
        } else {
          // Attempt to fetch user data from the server
          const response = await axios.get(
            "http://127.0.0.1:8000/api/v1/users/",
            {
              headers: {
                Authorization: `Bearer ${user?.token}`, // Include token if available
              },
            }
          );

          // Set the fetched profile and update user context
          setProfile(response.data);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
        // Optional: Navigate to login if there's an authentication error
        if (error.response && error.response.status === 401) {
          // Unauthorized access, navigate to login
          setUser(null); // Clear user from context
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [user, setUser, navigate]); // Ensure dependencies are correct

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="flex flex-row min-h-[100vh]">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-semibold mb-6">Faculty Options</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/complain")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              Complain
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/feedback")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              Feedback
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/profile/feedback-request")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              My Complaints
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/profile/document-information")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              Document
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/profile/document-history")}
              className="text-left w-full hover:bg-gray-700 p-2 rounded"
            >
              History
            </button>
          </li>
        </ul>
      </div>

      {/* Profile Content */}
      <div className="w-3/4 p-8 bg-gray-100">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Your Profile</h2>
          <div className="flex justify-center mb-8">
            <img
              src={profile.profilePicture || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Name:</h3>
            <p className="text-lg p-3 border border-gray-300 rounded-md">
              {profile.username}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Email:</h3>
            <p className="text-lg p-3 border border-gray-300 rounded-md">
              {profile.email}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold">Role:</h3>
            <p className="text-lg p-3 border border-gray-300 rounded-md">
              {profile.role}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/edit-profile")}
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
