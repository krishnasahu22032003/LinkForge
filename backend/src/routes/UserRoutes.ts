import express from "express" ; 
import { UserSignUp, verifyEmail } from "../controller.ts/UserController.js";

const UserRouter = express.Router() ;

UserRouter.post("/signup" , UserSignUp) ;
UserRouter.post("/verifyEmail" , verifyEmail) ;

export default UserRouter ;