import type { Request, Response, NextFunction, } from "express";
import { AUTH_COOKIE_NAME } from "../config/cookie.js";
import { verifyToken } from "../lib/jwt.js";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token missing"
        });
    };

    try {

        const decoded = verifyToken(token);

        req.userId = decoded.userId;

      return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    };

};
