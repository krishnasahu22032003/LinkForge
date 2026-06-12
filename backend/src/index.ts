import express from "express" ; 
import cookieParser from "cookie-parser" ;
import startServer from "./lib/startServer.js";
import UserRouter from "./routes/UserRoutes.js";

const app = express() ;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", UserRouter);

startServer(app) ;