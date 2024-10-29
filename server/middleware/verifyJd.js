export const verifyJd = (department) => {
  return (req, res, next) => {
    console.log("User in verifyJD:", req.user); // Log to check if req.user is defined

    if (!req.user || !req.user.role) {
      // Check if req.user and req.user.role are defined
      return res
        .status(403)
        .json({
          message: "Access denied: Not authorized to view these complaints",
        });
    }
    const userRole = req.user.role;

    if (userRole === `${department}_jd`) {
      req.department = department;
      next();
    } else {
      return res
        .status(403)
        .json({
          message: "Access denied: Not authorized to view these complaints",
        });
    }
  };
};
