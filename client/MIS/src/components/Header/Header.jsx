import  { useState } from 'react';
import Logo from "../../assets/logo_NIT.png";
const Profile = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-[#4a0b0e] shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side of the navbar */}
        <div className="text-xl font-semibold text-white">
          <img src={Logo} alt="Logo" className="w-16 h-16 rounded-full"/>
        </div>

        {/* Right side of the navbar */}
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={toggleProfileMenu}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>

          {/* Profile dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-4">
                <p className="text-sm text-gray-800 font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
              <div className="border-t border-gray-200"></div>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Profile;
