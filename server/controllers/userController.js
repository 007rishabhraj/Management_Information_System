import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendToken from "../utils/sendToken.js";


 const login = async (req, res) => {
  const { email, password ,role} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    if(role!=user.role){
      return res.status(400).json({message:"Users role is not valid"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Create token and send it using sendToken function
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    sendToken(user, 200, token, res); // Call your sendToken function
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


 const createUser = async (req, res) => {
  const { username, password, role, roomNo , confirmPassword,email, phoneNo } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "Error",
        message: "User already exists! Please login",
      });
    }
    if (password != confirmPassword) {
      return res.status(400).json({
        status: "Error",
        message: "Password must be same",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      roomNo,
      phoneNo,
    });
    await newUser.save();
    res
      .status(201)
      .json({
        message: "User created successfully",
        user: newUser,
      });
  } catch (error) {
    console.error("Error in user registration:", error); // Log the error details for debugging
    res.status(500).json({
      message: "Error creating user",
      error: error.message || "An unknown error occurred",
    });
  }
};


// const getUser = async (req, res) => {
//   try {
//     const user = req.body.user;
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user)
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

 const updateUserProfile = async (req, res) => {
  const { username, email, roomNo ,phoneNo } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, roomNo , phoneNo },
      { new: true, runValidators: true } // Return the updated document and validate
    ).select("-password");
    // console.log(updatedUser)

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
export default { createUser, getUser, login,updateUserProfile };
