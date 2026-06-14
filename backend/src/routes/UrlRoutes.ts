import express from "express" ;
import { CreateUrl, deleteUrl, getUserUrls, redirectUrl } from "../controller.ts/UrlController.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const UrlRouter = express.Router() ;

UrlRouter.post("/create", CreateUrl ) ;
UrlRouter.get("/me" , authMiddleware ,getUserUrls);
UrlRouter.delete("/:id" , authMiddleware ,deleteUrl);
UrlRouter.get("/:shortCode" , redirectUrl);

export default UrlRouter ;