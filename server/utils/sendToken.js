const sendToken = (user, statuscode, token, res) => {
  // Set different expiration times based on the user's role
  const expireTime = user.role != "normal_user" ? null : 20 * 60 * 1000; // JDs don’t expire, normal users expire after 20 mins

  res.cookie("token", token, {
    expires: expireTime ? new Date(Date.now() + expireTime) : null, // Null for session cookies
    httpOnly: true,
    sameSite: "strict",
  });

  user.password = undefined;
  res.status(statuscode).json({
    status: "success",
    token,
    user,
  });
};

export default sendToken;
