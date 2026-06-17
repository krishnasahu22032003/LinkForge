import type { NextFunction, Request  , Response} from "express";
import { AUTH_COOKIE_NAME } from "../config/cookie.js";
import { verifyToken } from "../lib/jwt.js";

export default function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token =
    req.cookies[AUTH_COOKIE_NAME];

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);

    req.userId = decoded.userId;
  } catch {}

  next();
}