import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const verifyUser = async (req, res, next) => {
  try {
    // Extract the token from cookies
    // console.log("cookies:",req.cookies)
    // const token = req.cookies.token;
    

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    // console.log(token);
    if (!token) {
      return res.status(400).json({
        status: "Error",
        message: "Token not provided",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by decoded token ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: "Error",
        message: "You are not logged in",
      });
    }

    req.user = user;
    // console.log(user);

    next();
  } catch (err) {
    return res.status(401).json({
      status: "Error",
      message: "Invalid token or authentication failed",
      error: err.message,
    });
  }
};

export default verifyUser;
