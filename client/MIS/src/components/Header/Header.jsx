


import Logo from "../../assets/logo_NIT.png"; // Import your logo

const Header = () => {
  return (
    <header className="bg-[#4a0b0e] text-white shadow-md">
      {/* Top Section: Logo and Titles */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left Section: Logo and Titles */}
        <div className="flex items-center">
          {/* Logo */}
          <img src={Logo} alt="NIT Hamirpur Logo" className=" h-20 mr-4" />

                    {/* <img src={Logo} alt="NIT Hamirpur Logo" className="w-16 h-16 mr-4" /> */}

          {/* Titles */}
          <div className="text-center">
            <h1 className="text-2xl font-bold leading-tight">
              राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर
            </h1>
            <p className="text-sm italic">(एक राष्ट्रीय महत्व का संस्थान)</p>
            <h2 className="text-xl font-semibold mt-1">
              National Institute of Technology Hamirpur
            </h2>
            <p className="text-sm italic">(An Institute of National Importance)</p>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/Official.NITHamirpur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a
            href="https://twitter.com/nithamirpurhp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/mwlite/in/nithamirpur-hamirpur-4688551b9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>

     
    </header>
  );
};

export default Header;
