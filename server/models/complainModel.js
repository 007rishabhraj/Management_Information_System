import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: String,
      required: true,
      enum: ["electric", "plumbing", "carpentry", "networking"], // Add more departments as needed
    },
    description: {
      type: String,
      required: true,
    },
    availability: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    location: {
      type: String,
      required: true,
      enum: ["lecture hall", "home department", "hostel"], // Add more locations as needed
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "resolved", "closed"], // Complaint status
    },
  },
  { timestamps: true }
);

export default  mongoose.model("Complaint", complaintSchema);



