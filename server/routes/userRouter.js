import express from "express";
import userController from "../controllers/userController.js";
import verifyUser from "../middleware/verifyUser.js";
import complainController from "../controllers/complainController.js";

export const userRouter = express.Router();

userRouter.route("/").all(verifyUser).get(userController.getUser);
userRouter.route("/signup").post(userController.createUser);
userRouter.route("/login").post(userController.login);

userRouter.route("/complain").post(complainController.createComplain);
userRouter.route("/complain").get(complainController.getComplain);
userRouter.route("/complain").delete(complainController.deleteComplain);
