function success(res, message = "Request successful", data = null, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function created(res, message = "Resource created successfully", data = null) {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
}

function badRequest(res, message = "Bad request", errors = null) {
  return res.status(400).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
}

function unauthorized(res, message = "Not authorized. Please log in") {
  return res.status(401).json({
    success: false,
    message,
  });
}

function forbidden(res, message = "You do not have permission to perform this action") {
  return res.status(403).json({
    success: false,
    message,
  });
}

function notFound(res, message = "Resource not found") {
  return res.status(404).json({
    success: false,
    message,
  });
}

function serverError(res, message = "Internal server error") {
  return res.status(500).json({
    success: false,
    message,
  });
}

export default {
  success,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError,
};