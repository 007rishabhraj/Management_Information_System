import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 bg-[#4a0b0e] text-white">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">John Doe</h1>
              <p>Member</p>
            </div>
          </div>
          <button className="bg-[#640f12] hover:bg-[#5a0d10] text-white py-2 px-4 rounded-lg">
            Edit Profile
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-gray-600"><strong>Email:</strong> john.doe@example.com</p>
              <p className="text-gray-600 mt-2"><strong>Phone:</strong> +1234567890</p>
              <p className="text-gray-600 mt-2"><strong>Address:</strong> 123 Main St, Anytown, USA</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow">
              {/* <p className="text-gray-600"><strong>Member Since:</strong> January 15, 2020</p> */}
              {/* <p className="text-gray-600 mt-2"><strong>Subscription:</strong> Premium</p> */}
              {/* <p className="text-gray-600 mt-2"><strong>Last Login:</strong> August 22, 2024</p> */}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">User Actions</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                View Activity
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
                Manage Subscription
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
                Account Settings
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
