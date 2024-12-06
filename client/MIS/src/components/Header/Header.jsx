import Logo from "/National_Institute_of_Technology,_Hamirpur_Logo.png";

const Header = () => {
  return (
    <header className="bg-[#4a0b0e] text-white shadow-md sticky top-0">
      {/* Top Section: Logo and Titles */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6">
        {/* Left Section: Logo and Titles */}
        <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
          {/* Logo */}
          <img src={Logo} alt="NIT Hamirpur Logo" className="h-16 sm:h-20 mr-4" />
          
          {/* Titles */}
          <div className="text-center">
            <h1 className="text-lg sm:text-2xl font-bold leading-tight">
              राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर
            </h1>
            <p className="text-xs sm:text-sm italic">(एक राष्ट्रीय महत्व का संस्थान)</p>
            <h2 className="text-base sm:text-xl font-semibold mt-1">
              National Institute of Technology Hamirpur
            </h2>
            <p className="text-xs sm:text-sm italic">(An Institute of National Importance)</p>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="flex space-x-4 w-full md:w-auto justify-center md:justify-end">
          <a
            href="https://www.facebook.com/Official.NITHamirpur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <i className="fab fa-facebook text-lg sm:text-xl"></i>
          </a>
          <a
            href="https://twitter.com/nithamirpurhp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <i className="fab fa-twitter text-lg sm:text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/mwlite/in/nithamirpur-hamirpur-4688551b9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <i className="fab fa-linkedin text-lg sm:text-xl"></i>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <i className="fab fa-instagram text-lg sm:text-xl"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
