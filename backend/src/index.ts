import express from "express" ; 
import cookieParser from "cookie-parser" ;
import startServer from "./lib/startServer.js";
import UserRouter from "./routes/UserRoutes.js";
import UrlRouter from "./routes/UrlRoutes.js";
import cors from "cors" ;
import HealthRouter from "./routes/HealthRoute.js";

const app = express() ;

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"https://linkforge.krishnastack.com" , credentials:true}));
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/url", UrlRouter);
app.use("/ap1/v1/health" , HealthRouter)

startServer(app) ;