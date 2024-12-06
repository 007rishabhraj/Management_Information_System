import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email:{
    required:true,
    type:String,
    trim:true,
    lowercase:true,
  },
  password: {
    type: String,
    required: true,
  },
   confirmPassword:{
    type:String,
  },
  role: {
    type: String,
    required: true,
    enum: [
      "normal_user",
      "electric_jd",
      "plumbing_jd",
      "carpentry_jd",
      "networking_jd",
      "admin",
    ],
  },
  roomNo: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
