
const sendToken = (user, statuscode, token, res) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    // secure: true,
    sameSite: "strict",
    httpOnly: true,
    // path: '/',
    // domain:'localhost'
  });

  user.password = undefined;
  res.status(statuscode).json({
    status: "success",
    token,
    user,
  });
};

export default sendToken;
