import express from "express";
import userController from "../controllers/userController.js";
import verifyUser from "../middleware/verifyUser.js";
import complainController from "../controllers/complainController.js";
import feedbackController from "../controllers/feedbackController.js";
import jdController from "../controllers/jdController.js";
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
userRouter.route("/allcomplains").get(verifyUser,complainController.getUserComplaints)
userRouter
  .route("/complaints/:complaintId").all(verifyUser)
  .patch(complainController.updateComplaintStatus);
userRouter
  .route("/complain")
  .all(verifyUser)
  .post(complainController.createComplaint);
userRouter                 ///update rating 
  .route("/complain/:id/rating")
  .patch(complainController.updateRating);
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



//////////feedback from jd
userRouter
  .route("/feedback")
  .post(feedbackController.createFeedback);
userRouter
  .route("/feedback")
  .get(feedbackController.getFeedback);
userRouter
  .route("/feedback/:feedbackId")
  .patch(feedbackController.updateFeedback);
userRouter
  .route("/feedback/:feedbackId")
  .delete(feedbackController.deleteFeedback)

userRouter
.route("/jds")
.get(jdController.getAllJds);