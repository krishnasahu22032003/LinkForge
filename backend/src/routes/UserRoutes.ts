import express from "express";
import { GetUserDetail, updateUserDetails, UserSignIn, UserSignOut, UserSignUp, verifyEmail } from "../controller.ts/UserController.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/signup", UserSignUp);
UserRouter.post("/verifyEmail", verifyEmail);
UserRouter.post("/signin", UserSignIn);
UserRouter.get("/me", authMiddleware, GetUserDetail);
UserRouter.post("/Signout", authMiddleware, UserSignOut);
UserRouter.patch("/update", authMiddleware, updateUserDetails);

export default UserRouter;