import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="text-center text-brown-700 font-bold text-3xl mb-4">
        Complaint Portal System
      </div>
      <div className="text-center text-brown-600 text-lg mb-8">
        Easily submit and manage your complaints through our user-friendly
        platform.
      </div>
      <div
        className="bg-brown-100 p-6 rounded-lg shadow-lg flex flex-col items-center max-w-sm"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="text-center mb-4">
          <svg
            className="w-16 h-16 mx-auto text-brown-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C10.35 2 8.78 2.55 7.5 3.5L2 6v12l5.5 2.5C8.78 21.45 10.35 22 12 22s3.22-.55 4.5-1.5L22 18V6l-5.5-2.5C15.22 2.55 13.65 2 12 2zm0 2c1.26 0 2.45.35 3.5.94L20 6.27l-5.5 2.5c-.56-.4-1.22-.67-2-.67s-1.44.27-2 .67L4 6.27l4.5-1.33C9.55 4.35 10.74 4 12 4zm0 16c-1.26 0-2.45-.35-3.5-.94l-4.5 1.33 5.5-2.5c.56.4 1.22.67 2 .67s1.44-.27 2-.67l5.5 2.5-4.5-1.33c1.05-.59 2.24-.94 3.5-.94z" />
          </svg>
        </div>
        <div className="text-center text-brown-800 font-semibold mb-2">
          User Login / Sign Up
        </div>
        <div className="text-center text-brown-600 mb-4">
          Access the portal to submit and track your complaints
        </div>
        <button
          onClick={handleClick}
          className="bg-brown-600 border-black text-black py-2 px-4 rounded shadow hover:bg-brown-700 transition duration-200"
        >
          Login / Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home;
