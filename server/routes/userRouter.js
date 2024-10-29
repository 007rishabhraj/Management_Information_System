import express from "express";
import userController from "../controllers/userController.js";
import verifyUser from "../middleware/verifyUser.js";
import complainController from "../controllers/complainController.js";
import { verifyJd } from "../middleware/verifyJd.js";

export const userRouter = express.Router();

// uuser endpoints
userRouter.route("/").all(verifyUser).get(userController.getUser);
userRouter.route("/signup").post(userController.createUser);
userRouter
  .route("/updateUser")
  .all(verifyUser)
  .post(userController.updateUserProfile);
userRouter.route("/login").post(userController.login);


// complain endpoints
userRouter
  .route("/complain")
  .all(verifyUser)
  .post(complainController.createComplaint);
userRouter
  .route("/department/electrical")
  .get(
    verifyUser,
    verifyJd("electric"),
    complainController.getDepartmentComplaints
  );

userRouter
  .route("/department/plumbing")
  .get(
    verifyUser,
    verifyJd("plumbing"),
    complainController.getDepartmentComplaints
  );

userRouter
  .route("/department/networking")
  .get(
    verifyUser,
    verifyJd("networking"),
    complainController.getDepartmentComplaints
  );

userRouter
  .route("/department/carpentry")
  .get(
    verifyUser,
    verifyJd("carpentry"),
    complainController.getDepartmentComplaints
  );
