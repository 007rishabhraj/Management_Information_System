const express = require("express");
const Admin = require("../models/admin");
const Complaint = require("../models/complaint");

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Simulate authentication (you can replace this with JWT later)
    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Fetch complaints for the specific JD
router.get("/complaints", async (req, res) => {
  try {
    const { jd } = req.query; // Get the JD (job description) from the query parameters
    const complaints = await Complaint.find({ jd }).populate(
      "user",
      "name email"
    );

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints", error });
  }
});

module.exports = router;
