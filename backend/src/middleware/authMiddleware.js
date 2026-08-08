import jwt from "jsonwebtoken";
import env from "../config/env.js";

export function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Invalid token format",
      });
    }

    const decoded = jwt.verify(token, env.jwt.secret);

    req.admin = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token",
    });
  }
}

export default protect;