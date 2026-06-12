import express from "express" ; 
import { UserSignUp } from "../controller.ts/UserController.js";

const UserRouter = express.Router() ;

UserRouter.post("/signup" , UserSignUp) ;

export default UserRouter ;