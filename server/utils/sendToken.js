
const sendToken = (user, statuscode, token, res) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 20 * 60 * 1000), // 20 minutes
    httpOnly: true, // Make sure this is true for security
    sameSite: "strict", // Adjust this based on your CORS requirements
  });

  user.password = undefined;
  res.status(statuscode).json({
    status: "success",
    token,
    user,
  });
};

export default sendToken;
