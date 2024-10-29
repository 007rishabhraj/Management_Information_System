import  { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = ({ admin }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (admin && admin.jd) {
      // Ensure admin and admin.jd exist before making the API call
      const fetchComplaints = async () => {
        try {
          // Fetch complaints filtered by admin's JD
          const response = await axios.get(
            `/api/admin/complaints?jd=${admin.jd}`
          );
          setComplaints(response.data);
        } catch (err) {
          console.error("Error fetching complaints", err);
        }
      };

      fetchComplaints();
    }
  }, [admin]); // Dependency on admin data

  if (!admin) {
    return <p>Loading...</p>; // Render a loading state if admin is not available
  }

  return (
    <div>
      <h2>{admin.jd} Complaints Dashboard</h2>
      {complaints.length > 0 ? (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint._id}>
              <h4>{complaint.regarding}</h4>
              <p>{complaint.description}</p>
              <p>Status: {complaint.status}</p>
              <p>Location: {complaint.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints found for {admin.jd}</p>
      )}
    </div>
  );
};

export default AdminDashboard;
