import { useState, useEffect } from "react";
import axios from "axios";

function role(r){
  if(r === "electric_jd") return "Electric JE"
  if(r === "plumbing_jd") return "Plumbing JE"
  if(r === "carpentry_jd") return "Carpentry JE"
  if(r === "networking_jd") return "Networking JE"
}

const JeInfo = ()=>{
  const [jes , setJes] = useState([]);
  useEffect(() => {
    const fetchJes = async () => {
        try {
            const path = `http://localhost:8000/api/v1/users/jds`;
            const response = await axios.get(path, {
            headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setJes(response.data || []);
        } catch (err) {
            console.error("Error fetching complaints :", err);
            setJes([]);
        }
      };
      fetchJes();
    }, []);


  if (!jes) {
    return <p className="text-center text-gray-500">List Not Found!</p>;
  }
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-white p-4 shadow-md rounded-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          All JE's List
        </h2>
      </header>
      <main className="bg-white p-4 shadow-md rounded-md">

        {/* Display JE data */}
        {jes.length > 0 ? (
          <ul className="space-y-4">
            {jes.map((je) => (
              <li
                key={je._id}
                className="p-4 border border-gray-200 rounded-md flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xl font-semibold">
                    {je.username}
                  </h4>
                  <p className="text-m text-gray-700">
                    Role : {role(je.role)}
                  </p>
                  <p className="text-m text-gray-700">
                    Email : {je.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : "List Not Found"
      }
      </main>
    </div>
  );
}

export default JeInfo;
