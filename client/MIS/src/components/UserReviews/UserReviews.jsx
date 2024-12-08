import { useState, useEffect } from "react";
import axios from "axios";
import CheckBox from "../Review/Checkbox";

function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Convert UTC time to IST (UTC + 5 :30)
  const istOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
  const istDate = new Date(date.getTime() + istOffset);

  // Format the time in 12-hour format with AM/PM
  let hours = istDate.getHours();
  const minutes = String(istDate.getMinutes()).padStart(2, '0');
  const amPm = hours >= 12 ? 'PM'  : 'AM';
  hours = hours % 12 || 12; // Convert 0 hour to 12 for 12-hour format
  const time = `${String(hours).padStart(2, '0')} :${minutes} ${amPm}`;

  // Format the date as DD/MM/YY
  const day = String(istDate.getDate()).padStart(2, '0');
  const month = String(istDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(istDate.getFullYear()).slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  // Combine the results
  return `${time} ${formattedDate}`;
}

const UserHistory = ()=>{
  const rawData = localStorage.getItem("user")
  let user = null;
  if(rawData) user = JSON.parse(rawData);
  const [complaints , setComplaints] = useState([]);
  useEffect(() => {
    if (user) {
      const fetchComplaints = async () => {
        try {
          const path = `http://localhost:8000/api/v1/users/allcomplains`;
          const response = await axios.get(path, {
            headers : {
              Authorization : `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setComplaints(response.data.complaints || []);
        } catch (err) {
          console.error("Error fetching complaints :", err);
          setComplaints([]);
        }
      };
      fetchComplaints();
    }
  }, []);


  if (!user) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const getComplaints = complaints.filter(complaint => complaint.status === "completed" && complaint.statusByUser !== "pending").reverse()
  

  return (
    <div className="p-  bg-gray-100 min-h-screen">
      <header className="bg-white p-4 shadow-md rounded-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Complaints</h2>
      </header>
      <main className="bg-white p-4 shadow-md rounded-md">
        {getComplaints.length > 0 ? (
          <ul className="space-y-4">
            {getComplaints.map((complaint) => (
              <li
                key={complaint._id}
                className="p-4 border border-gray-200 rounded-md flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xl font-semibold">
                    {complaint.description}
                  </h4>
                  <p className="text-m text-gray-700">
                    Department : {complaint.department}
                  </p>
                  <p className="text-m text-gray-700">
                    Status : {complaint.status}
                  </p>
                  <p className="text-m text-gray-700">
                    Status By User: {complaint.statusByUser==="completed" ? "Completed" : "Not Completed"}
                  </p>
                  <p className="text-m text-gray-700">
                    Location : {complaint.location}
                  </p>
                  <p className="text-m text-gray-700">
                    Availability :{" "}
                    {formatDateTime(complaint.availability.start)} to{" "}
                    {formatDateTime(complaint.availability.end)}
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
          <p className="text-gray-500">No complaints found</p>
        )}
      </main>
    </div>
  );
}

export default UserHistory;
