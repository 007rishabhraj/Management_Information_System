import { useState, useEffect } from "react";
import axios from "axios";

function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Convert UTC time to IST (UTC + 5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
  const istDate = new Date(date.getTime() + istOffset);

  // Format the time in 12-hour format with AM/PM
  let hours = istDate.getHours();
  const minutes = String(istDate.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format
  const time = `${String(hours).padStart(2, '0')}:${minutes} ${amPm}`;

  // Format the date as DD/MM/YY
  const day = String(istDate.getDate()).padStart(2, '0');
  const month = String(istDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(istDate.getFullYear()).slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  // Combine the results
  return `${time} ${formattedDate}`;
}


const AdminDashboard = () => {
  // Retrieve and parse the admin data from localStorage
  let admin = localStorage.getItem("admin");
  admin = admin ? JSON.parse(admin) : null;
  let jd;
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("pending"); // State to handle the active tab

  useEffect(() => {
    if (admin && admin.jd) {
      const fetchComplaints = async () => {
        try {
          // API call to fetch complaints
          if (admin.jd === "electric_jd") jd = "electrical";
          else if (admin.jd === "networking_jd") jd = "networking";
          else if (admin.jd === "plumbing_jd") jd = "plumbing";
          else if (admin.jd === "carpentry_jd") jd = "carpentry";
          const path = `http://localhost:8000/api/v1/users/department/${jd}`;
          const response = await axios.get(path, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setComplaints(response.data || []);
          console.log(response.data)
        } catch (err) {
          console.error("Error fetching complaints:", err);
          setComplaints([]);
        }
      };
      fetchComplaints();
    }
  }, []); // Run on component mount

  const markAsCompleted = async (complaintId) => {
    try {
      // API call to mark complaint as completed
      const path = `http://localhost:8000/api/v1/users/complaints/${complaintId}`;
      await axios.patch(path, 
      {
        complaintId,
        status : "completed",
      }, 
      {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      // Update the complaints state after marking as completed
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint._id === complaintId ? { ...complaint, status: "completed" } : complaint
        )
      );
    } catch (err) {
      console.error("Error marking complaint as completed:", err);
    }
  };

  if (!admin) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Split complaints into pending and completed
  const pendingComplaints = complaints.filter(complaint => complaint.status === "pending" || complaint.statusByUser === "pending");
  const completedComplaints = complaints.filter(complaint => complaint.status === "completed" && complaint.statusByUser !== "pending").reverse();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-white p-4 shadow-md rounded-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {admin.jd.slice(0, -3).toUpperCase()} Complaints Dashboard
        </h2>
      </header>
      <main className="bg-white p-4 shadow-md rounded-md">
        {/* Tabs for switching between pending and completed complaints */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Complaints
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Complaints
          </button>
        </div>

        {/* Display complaints based on the selected tab */}
        {activeTab === "pending" && pendingComplaints.length > 0 ? (
          <ul className="space-y-4">
            {pendingComplaints.map((complaint) => (
              <li
                key={complaint._id}
                className="p-4 border border-gray-200 rounded-md flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xl font-semibold">
                    {complaint.description}
                  </h4>
                  <p className="text-m text-gray-700">
                    Complaint Id: {complaint._id}
                  </p>
                  <p className="text-m text-gray-700">
                    From: {complaint.user.username}
                  </p>
                  <p className="text-m text-gray-700">
                    Contact: +91 {complaint.user.phoneNo}
                  </p>
                  <p className="text-m text-gray-700">
                    Status: {complaint.status}
                  </p>
                  <p className="text-m text-gray-700">
                    Status By User: {complaint.statusByUser}
                  </p>
                  <p className="text-m text-gray-700">
                    Location: {complaint.location}
                  </p>
                  <p className="text-m text-gray-700">
                    Availability: {formatDateTime(complaint.availability.start)} to {formatDateTime(complaint.availability.end)}
                  </p>
                </div>
                {complaint.status!=="completed" ? (
                <button
                  className="ml-4 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() => markAsCompleted(complaint._id)}
                >
                  Mark as Completed
                </button>
                ) : <span></span>}
              </li>
            ))}
          </ul>
        ) : activeTab === "completed" && completedComplaints.length > 0 ? (
          <ul className="space-y-4">
            {completedComplaints.map((complaint) => (
              <li
                key={complaint._id}
                className="p-4 border border-gray-200 rounded-md"
              >
                <div>
                  <h4 className="text-xl font-semibold">
                    {complaint.description}
                  </h4>
                  <p className="text-m text-gray-700">
                    Complaint Id: {complaint._id}
                  </p>
                  <p className="text-m text-gray-700">
                    From: {complaint.user.username}
                  </p>
                  <p className="text-m text-gray-700">
                    Contact: +91 {complaint.user.phoneNo}
                  </p>
                  <p className="text-m text-gray-700">
                    Status: {complaint.status}
                  </p>
                  <p className="text-m text-gray-700">
                    Status By User: {complaint.statusByUser==="completed" ? "Completed" : "Not Completed"}
                  </p>
                  <p className="text-m text-gray-700">
                    Location: {complaint.location}
                  </p>
                  <p className="text-m text-gray-700">
                    Availability: {formatDateTime(complaint.availability.start)} to {formatDateTime(complaint.availability.end)}
                  </p>
                  <p className="text-m text-gray-700">
                    Feedback by User: {complaint.feedback}
                  </p>
                  <p className="text-m text-gray-700">
                    Rating by User: {complaint.rating}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No {activeTab} complaints found</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
