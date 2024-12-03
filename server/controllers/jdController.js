import userModel from "../models/userModel.js";



const getAllJds = async (req, res) => {
  try {
    const roles = [
      "electric_jd",
      "plumbing_jd",
      "carpentry_jd",
      "networking_jd",
    ]; // Define desired roles
    const jds = await userModel.find({ role: { $in: roles } }); // Find users with roles in the list

    res.status(200).json(jds);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {getAllJds};