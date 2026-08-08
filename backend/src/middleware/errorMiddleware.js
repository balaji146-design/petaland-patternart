import env from "../config/env.js";

function errorMiddleware(err, req, res, next) {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || null;

  if (err.name === "ValidationError") {
    statusCode = 422;
    message = "Validation failed";
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Not authorized. Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Session expired. Please log in again";
  }

  if (err.code === "22P02") {
    statusCode = 400;
    message = "Invalid identifier format supplied";
  }

  if (err.code === "23505") {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  if (err.code === "23503") {
    statusCode = 400;
    message = "Referenced resource does not exist";
  }

  if (statusCode === 401 && !message) {
    message = "Not authorized to access this resource";
  }

  if (statusCode === 403 && !message) {
    message = "You do not have permission to perform this action";
  }

  if (statusCode === 404 && !message) {
    message = "Resource not found";
  }

  const response = {
    success: false,
    message: statusCode === 500 && env.isProduction ? "Internal server error" : message,
  };

  if (errors) {
    response.errors = errors;
  }

  if (!env.isProduction) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
}

export default errorMiddleware;