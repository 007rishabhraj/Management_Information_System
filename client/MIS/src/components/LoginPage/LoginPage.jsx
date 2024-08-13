import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/users/signup');
        console.log('Data:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex justify-center items-center m-auto w-[100vw] min-h-[100vh] '>
    <div className="min-w-[30%] p-8 bg-white shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={fetchData} >
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640f12]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640f12]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="text-sm mb-5">
          <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-[#640f12] text-white p-3 rounded-md hover:bg-[#4a0b0e] transition duration-200"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/signup" className="text-[#640f12] hover:underline">
          Login here
        </a>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
