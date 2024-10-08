import complainModel from "../models/complainModel.js";

const createComplain = async (req, res) => {
  try {
    const complain = req.body;
    const temp = new complainModel(complain);
    await temp.save();
    res.status(200).json(temp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getComplain = async (req, res) => {
  try {
    const complains = await complainModel.find().populate("complainer");
    // const complains = await complainModel.find();
    res.status(200).json(complains);
  } catch (e) {
    console.log(e);
  }
};

const deleteComplain = async (req, res) => {
  try {
    const complain = await complainModel.findByIdAndDelete(req.params.id);

    res.status(200).json(complain);
  } catch (e) {
    console.log(e);
  }
};

export default { createComplain, getComplain, deleteComplain };
