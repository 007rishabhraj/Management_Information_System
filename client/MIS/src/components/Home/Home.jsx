import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login'); 
  };


  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
      <div className="text-center text-brown-700 font-bold text-2xl mb-4">
        National Institute of Technology Hamirpur
      </div>
      <div className="text-center text-brown-600 text-lg mb-8">
        Access all educational technology systems and services at one common
        platform.
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="bg-brown-100 p-6 rounded-lg shadow-lg flex-1 max-w-sm" onClick={handleClick} style={{ cursor: 'pointer' }}>
          <div className="text-center mb-4">
            <svg
              className="w-12 h-12 mx-auto text-brown-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7h20L12 2zm0 2.236l7.764 4.264H4.236L12 4.236zM4 10h16v10H4V10zm10 6h2v2h-2v-2zm-4 0h2v2H10v-2z" />
            </svg>
          </div>
          <div className="text-center text-brown-800 font-semibold mb-2">
            Faculty Login
          </div>
          <div className="text-center text-brown-600">
            Login for Faculty Members
          </div>
        </div>
        <div className="bg-brown-100 p-6 rounded-lg shadow-lg flex-1 max-w-sm">
          <div className="text-center mb-4">
            <svg
              className="w-12 h-12 mx-auto text-brown-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7h20L12 2zm0 2.236l7.764 4.264H4.236L12 4.236zM4 10h16v10H4V10zm10 6h2v2h-2v-2zm-4 0h2v2H10v-2z" />
            </svg>
          </div>
          <div className="text-center text-brown-800 font-semibold mb-2">
            Admin Login
          </div>
          <div className="text-center text-brown-600">Login for Admins</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
