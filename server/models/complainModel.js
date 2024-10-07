import mongoose from "mongoose";

const complainSchema = new mongoose.Schema({
  location: {
    type: String,
  },
  regarding: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  complainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // default:" "
  },
});

const complainModel=new mongoose.model("complain",complainSchema);

export default complainModel;




