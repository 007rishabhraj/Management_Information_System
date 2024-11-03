import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  // Retrieve and parse the admin data from localStorage
  let admin = localStorage.getItem("admin");
  admin = admin ? JSON.parse(admin) : null;
  

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (admin && admin.jd) {
      const fetchComplaints = async () => {
        try {
          // API call to fetch complaints
          

          const response = await axios.get(
            `/api/v1/users/department/${admin.jd}`
          );
          const complaintsData = Array.isArray(response.data) ? response.data : [];
          setComplaints(complaintsData);
        } catch (err) {
          console.error("Error fetching complaints:", err);
          setComplaints([]);
        }
      };

      fetchComplaints();
    }
  }, []); // Run on component mount

  if (!admin) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-white p-4 shadow-md rounded-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {admin.jd.slice(0, -3).toUpperCase()} Complaints Dashboard
        </h2>
      </header>
      <main className="bg-white p-4 shadow-md rounded-md">
        {complaints.length > 0 ? (
          <ul className="space-y-4">
            {complaints.map((complaint) => (
              <li
                key={complaint._id}
                className="p-4 border border-gray-200 rounded-md"
              >
                <h4 className="text-lg font-semibold text-gray-700">
                  {complaint.regarding}
                </h4>
                <p className="text-gray-600">{complaint.description}</p>
                <p className="text-sm text-gray-500">
                  Status: {complaint.status}
                </p>
                <p className="text-sm text-gray-500">
                  Location: {complaint.location}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No complaints found for {admin.department}</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
