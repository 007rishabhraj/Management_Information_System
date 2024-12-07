import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating:{
      type:Number,
      min:0,
      max:5
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
    feedback: {
      type: String,
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
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed", "closed"], // Complaint status
    },
    statusByUser: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

export default  mongoose.model("Complaint", complaintSchema);



