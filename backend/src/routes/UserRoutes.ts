import express from "express";
import { GetUserDetail, GoogleAuth, updateUserDetails, UserSignIn, UserSignOut, UserSignUp, verifyEmail } from "../controller.ts/UserController.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/signup", UserSignUp);
UserRouter.post("/google", GoogleAuth);
UserRouter.post("/verifyEmail", verifyEmail);
UserRouter.post("/signin", UserSignIn);
UserRouter.get("/me", authMiddleware, GetUserDetail);
UserRouter.post("/Signout", authMiddleware, UserSignOut);
UserRouter.patch("/update", authMiddleware, updateUserDetails);

export default UserRouter;