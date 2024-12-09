import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CheckBox = ({complaintId}) => {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(response)
    try{
      const path = `http://localhost:8000/api/v1/users/complaints/${complaintId}`;
      await axios.patch(path, 
      {
        complaintId,
        statusByUser : (response==="Yes" ? "completed" : "notCompleted" ),
      }, 
      {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      navigate("/review", { state: { complaintId } });
    }
    catch(err)
    {
      console.log(err);
    }
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-lg font-semibold mb-4">
          Is the Task Completed ?
        </h2>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="yes"
            name="workDone"
            value="Yes"
            onChange={(e) => setResponse(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="yes" className="text-gray-700">
            Yes
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="no"
            name="workDone"
            value="No"
            onChange={(e) => setResponse(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="no" className="text-gray-700">
            No
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full"
          disabled={!response}
        >
          Submit
        </button>
      </form>
    // </div>
  );
};

export default CheckBox;
