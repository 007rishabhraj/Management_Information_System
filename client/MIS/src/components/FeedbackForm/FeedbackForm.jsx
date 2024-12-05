import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [department, setDepartment] = useState('');
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!department) {
      setErrorMessage('Please select a department.');
      return;
    }

    try {
      const response = await axios.post('/api/complaints', { department, feedback });
      if (response.status === 200) {
        setSuccessMessage('Complaint submitted successfully!');
        setDepartment('');
        setFeedback('');
      }
    } catch (error) {
      setErrorMessage('There was an error submitting your complaint. Please try again.');
    }
  };

  return (
    <div className="min-w-[50%] min-h-screen p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#4a0b0e]">Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        {/* Department Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Concerned Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#640f12] transition duration-300"
            required
          >
            <option value="" disabled>Select Department</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Electrical">Electrical</option>
            <option value="Networking">Networking</option>

            
          </select>
        </div>

        {/* Feedback/Complaint Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-48 p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#640f12] transition duration-300"
            placeholder="Enter the details of your complaint..."
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#640f12] text-white py-3 text-lg rounded-lg hover:bg-[#50100f] transition duration-300"
        >
          Submit Feedback
        </button>
      </form>
      
      {successMessage && <p className="mt-6 text-green-600 text-lg">{successMessage}</p>}
      {errorMessage && <p className="mt-6 text-red-600 text-lg">{errorMessage}</p>}
    </div>
  );
};

export default FeedbackForm;
