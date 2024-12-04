import Complaint from "../models/complainModel.js";

// Submit a new complaint
const createComplaint = async (req, res) => {
  const { department, description, availability, location } = req.body;

  try {
    const complaint = new Complaint({
      user: req.user._id, // Link to the user submitting the complaint
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
      "username email"
    ); // Populate user info
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body; 
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
      "department location availability description status createdAt"
    );

    res.status(200).json({ complaints });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Error retrieving complaints", error: error.message });
  }
};

export default {
  createComplaint,
  getDepartmentComplaints,
  updateComplaintStatus,
  getUserComplaints
};
