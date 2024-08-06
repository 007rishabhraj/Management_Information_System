import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const verifyUser = async (req, res, next) => {
  try {
    // Extract the token from cookies
    const token = req.cookies.token;

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

    // Attach the user to the request object
    req.user = user;
    console.log(user);

    // Proceed to the next middleware
    next();
  } catch (err) {
    // Handle errors (e.g., invalid token)
    return res.status(401).json({
      status: "Error",
      message: "Invalid token or authentication failed",
      error: err.message,
    });
  }
};

export default verifyUser;
