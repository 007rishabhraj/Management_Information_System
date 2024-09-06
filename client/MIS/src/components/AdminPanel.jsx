// src/AdminPanel.js
import React, { useState } from 'react';

const allComplaints = {
  electrical: [
    { id: '1', subject: 'Broken Outlet', description: 'The electrical outlet in the living room is not working.', status: 'submitted' },
    { id: '2', subject: 'Flickering Light', description: 'The kitchen light flickers intermittently.', status: 'in-progress' },
  ],
  plumbing: [
    { id: '3', subject: 'Leaky Faucet', description: 'The kitchen faucet is leaking constantly.', status: 'submitted' },
    { id: '4', subject: 'Clogged Sink', description: 'The bathroom sink is clogged.', status: 'resolved' },
  ],
  carpentry: [
    { id: '5', subject: 'Loose Door Handle', description: 'The handle on the main door is loose.', status: 'resolved' },
    { id: '6', subject: 'Broken Cabinet', description: 'The kitchen cabinet door is broken.', status: 'submitted' },
  ],
  internet: [
    { id: '7', subject: 'Internet Connection', description: 'The internet connection is very slow.', status: 'submitted' },
    { id: '8', subject: 'Wi-Fi Dropping', description: 'The Wi-Fi connection drops frequently.', status: 'in-progress' },
  ],
};

const AdminPanel = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('electrical');

  const handleStatusChange = (id, newStatus) => {
    console.log(`Change status of complaint ${id} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Complaints</h2>
        <div className="mb-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="carpentry">Carpentry</option>
            <option value="internet">Internet</option>
          </select>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allComplaints[selectedDepartment].map((complaint) => (
              <tr key={complaint.id}>
                <td className="py-2 px-4 border-b">{complaint.id}</td>
                <td className="py-2 px-4 border-b">{complaint.subject}</td>
                <td className="py-2 px-4 border-b">{complaint.description}</td>
                <td className="py-2 px-4 border-b">{complaint.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleStatusChange(complaint.id, 'in-progress')}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange(complaint.id, 'resolved')}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Resolved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
