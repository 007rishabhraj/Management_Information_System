// import complainModel from "../models/complainModel.js";

// const createComplain = async (req, res) => {
//   try {
//     const complain = req.body;
//     const temp = new complainModel(complain);
//     await temp.save();
//     res.status(200).json(temp);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// const getComplain = async (req, res) => {
//   try {
//     const complains = await complainModel.find().populate("complainer");
//     // const complains = await complainModel.find();
//     res.status(200).json(complains);
//   } catch (e) {
//     console.log(e);
//   }
// };

// const deleteComplain = async (req, res) => {
//   try {
//     const complain = await complainModel.findByIdAndDelete(req.params.id);

//     res.status(200).json(complain);
//   } catch (e) {
//     console.log(e);
//   }
// };

// export default { createComplain, getComplain, deleteComplain };

import Complaint from '../models/complainModel.js';

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

export default {createComplaint,getDepartmentComplaints};
