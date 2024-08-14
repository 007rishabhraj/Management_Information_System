import React, { useState } from 'react';
import axios from 'axios';


function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // const sendRequest = async () => {
  //   const res = await axios
  //     .post("http://localhost:8000/signup", {
  //       name,
  //       email,
  //       password,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };
  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   // send http request
  //   sendRequest().then(() => {console.log("success")});
  // };

  const handleSignup = (e) => {
    e.preventDefault();
    if(password !== confirmPassword)
    {
      alert("Confirm Password doesn't match with the Password");
      return;
    }
    axios.post("http://127.0.0.1:8000/api/v1/users/signup" , { email , password , name} ).then((response) => {
      console.log(response)
    }).catch((err)=> {console.log(err)})
  };

  return (
    <div className='flex justify-center items-center m-auto w-[100vw] min-h-[100vh] '>
    <div className="min-w-[30%] p-8 bg-white shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640f12]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640f12]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#640f12] text-white p-3 rounded-md hover:bg-[#4a0b0e] transition duration-200"
        >
          Signup
        </button>
      </form>
      <div className="mt-4 text-center">
        Already have an account?{' '}
        <a href="/login" className="text-[#640f12] hover:underline">
          Login here
        </a>
      </div>
    </div>
    </div>
  );
}

export default SignupPage;
