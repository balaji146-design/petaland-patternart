import jwt from "jsonwebtoken";
import env from "../config/env.js";

function generateToken(payload, expiresIn = env.jwt.expiresIn) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Token payload must be a valid object");
  }

  return jwt.sign(payload, env.jwt.secret, {
    expiresIn,
  });
}

export default generateToken;