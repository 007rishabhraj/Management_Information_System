const Profile = () => {
  return (
    <nav className="bg-[#4a0b0e] shadow-lg p-4 sticky top-0">
      <div className="container flex items-center justify-between mx-auto">
        {/* Left side of the navbar */}
        <div className="flex items-center ml-4">
          <img
            src="https://nith.ac.in/uploads/settings/15795036012617.png"
            alt="Logo"
            className="h-20 rounded-full object-cover"
          />
        </div>

        {/* Right side of the navbar */}
        <ul className="flex space-x-4 mr-4">
          <li>
            <a
              href="https://www.facebook.com/Official.NITHamirpur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-2xl"
            >
              <i className="fab fa-facebook"></i> {/* Corrected class */}
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/nithamirpurhp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600 text-2xl"
            >
              <i className="fab fa-twitter"></i> 
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/mwlite/in/nithamirpur-hamirpur-4688551b9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 text-2xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 text-2xl"
            >
              <i className="fab fa-instagram"></i> {/* Corrected class */}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Profile;