import express from "express";
import { CreateUrl, deleteUrl, getDashboardStats, getUrlAnalytics, getUserUrls, redirectUrl } from "../controller.ts/UrlController.js";
import authMiddleware from "../middlewares/authmiddleware.js";
import optionalAuth from "../middlewares/optinalAuth.js";

const UrlRouter = express.Router();

UrlRouter.post("/create",optionalAuth,CreateUrl);
UrlRouter.get("/me", authMiddleware, getUserUrls);
UrlRouter.get("/dashboard/stats", authMiddleware, getDashboardStats);
UrlRouter.delete("/:id", authMiddleware, deleteUrl);
UrlRouter.get("/:shortCode", redirectUrl);
UrlRouter.get("/:id/analytics", authMiddleware, getUrlAnalytics);

export default UrlRouter;