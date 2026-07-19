import express from "express" ; 
import healthCheck from "../controller.ts/HealthCheckController.js";

const HealthRouter = express.Router();

HealthRouter.get("/check" , healthCheck) ;

export default HealthRouter ; 