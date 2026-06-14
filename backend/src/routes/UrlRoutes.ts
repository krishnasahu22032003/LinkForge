import express from "express" ;
import { CreateUrl, redirectUrl } from "../controller.ts/UrlController.js";

const UrlRouter = express.Router() ;

UrlRouter.post("/create", CreateUrl ) ;
UrlRouter.get("/:shortCode" , redirectUrl);

export default UrlRouter ;