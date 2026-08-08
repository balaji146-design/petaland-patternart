import { validationResult } from "express-validator";

function validateMiddleware(req, res, next) {
  const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   const formattedErrors = errors.array().map((error) => ({
  //     field: error.path,
  //     message: error.msg,
  //   }));

  //   return res.status(422).json({
  //     success: false,
  //     message: "Validation failed",
  //     errors: formattedErrors,
  //   });
  // }

  if (!errors.isEmpty()) {

  console.log("========== VALIDATION ERROR ==========");
  console.log(errors.array());
  console.log("BODY :", req.body);
  console.log("FILE :", req.file);
  console.log("======================================");

  const formattedErrors = errors.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));

  return res.status(422).json({
    success: false,
    message: "Validation failed",
    errors: formattedErrors,
  });
}

  return next();
}

export default validateMiddleware;