import Complaint from "../models/complainModel.js";

// Submit a new complaint
const createComplaint = async (req, res) => {
  const {department, description, availability, location } = req.body;
  console.log(req.body)
  try {
    const complaint = new Complaint({
      user: req.body.user._id, // Link to the user submitting the complaint
      department,
      description,
      availability,
      location,
    });

    await complaint.save();
    res
      .status(201)
      .json({ message: "Complaint submitted successfully", complaint });
  } catch (error) {
    res.status(500).json({ message: "Error submitting complaint", error });
  }
};

const getDepartmentComplaints = async (req, res) => {
  const department = req.user.role.split("_")[0]; // Extract department from user role (e.g., electrical_jd)
  try {
    const complaints = await Complaint.find({ department }).populate(
      "user",
      "username email phoneNo",
    ); // Populate user info
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status , statusByUser } = req.body; 
    if(status){
      const validStatuses = ["pending", "in-progress", "completed","closed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const complaint = await Complaint.findById(complaintId);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }

      complaint.status = status;
      await complaint.save();

      res.status(200).json({ message: "Complaint status updated", complaint });
  }
  else{
    console.log(statusByUser)
    const validStatuses = ["notCompleted" , "completed"];
      if (!validStatuses.includes(statusByUser)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const complaint = await Complaint.findById(complaintId);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }

      complaint.statusByUser = statusByUser;
      await complaint.save();
      res.status(200).json({ message: "Complaint status updated", complaint });
  }
  } catch (error) {
    res.status(500).json({
      message: "Error updating complaint status",
      error: error.message,
    });
  }
};

const getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).select(
      "department location availability description status createdAt statusByUser feedback rating"
    );

    res.status(200).json({ complaints });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Error retrieving complaints", error: error.message });
  }
};


const updateRating=async (req,res)=>{
   try {
    const { id } = req.params; // Complaint ID
    const { rating , feedback} = req.body;
    console.log(rating , feedback)
    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    // Fetch the complaint
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found.' });
    }

    

    // Update the rating and comments
    complaint.rating = rating;
    complaint.feedback = feedback;
    await complaint.save();

    return res.json({
      message: 'Rating updated successfully.',
      complaint,
    });
  } catch (error) {
    console.error('Error updating rating:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}


export default {
  createComplaint,
  getDepartmentComplaints,
  updateComplaintStatus,
  getUserComplaints,
  updateRating
};
