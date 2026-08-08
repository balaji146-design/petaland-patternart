// import { body } from "express-validator";

// export const createDesignValidator = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Design name is required")
//     .isLength({ min: 3, max: 150 })
//     .withMessage("Design name must be between 3 and 150 characters"),

//   body("categoryId")
//     .notEmpty()
//     .withMessage("Category is required")
//     .isInt({ min: 1 })
//     .withMessage("Category must be a valid id"),

//   body("description")
//     .trim()
//     .notEmpty()
//     .withMessage("Description is required")
//     .isLength({ min: 10, max: 2000 })
//     .withMessage("Description must be between 10 and 2000 characters"),

//   body("actualPrice")
//     .notEmpty()
//     .withMessage("Actual price is required")
//     .isFloat({ min: 0 })
//     .withMessage("Actual price must be a positive number"),

//   body("offerPrice")
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage("Offer price must be a positive number")
//     .custom((value, { req }) => {
//       const actual = req.body.actualPrice ?? req.body.actual_price
//       if (Number(value) > Number(actual)) {
//         throw new Error("Offer price cannot be greater than actual price");
//       }
//       return true;
//     }),
// ];

// export const updateDesignValidator = [
//   body("name")
//     .optional()
//     .trim()
//     .isLength({ min: 3, max: 150 })
//     .withMessage("Design name must be between 3 and 150 characters"),

//   body("categoryId")
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage("Category must be a valid id"),

//   body("description")
//     .optional()
//     .trim()
//     .isLength({ min: 10, max: 2000 })
//     .withMessage("Description must be between 10 and 2000 characters"),

//   body("actualPrice")
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage("Actual price must be a positive number"),

//   body("offerPrice")
//     .optional()
//     .isFloat({ min: 0 })
//     .withMessage("Offer price must be a positive number")
//     .custom((value, { req }) => {
//       const actual = req.body.actualPrice ?? req.body.actual_price
//       if (actual !== undefined && Number(value) > Number(actual)) {
//         throw new Error("Offer price cannot be greater than actual price");
//       }
//       return true;
//     }),
// ];

// export default {
//   createDesignValidator,
//   updateDesignValidator,
// };

import { body } from "express-validator";

export const createDesignValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Design name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Design name must be between 3 and 150 characters"),

  body("categoryId")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isUUID()
    .withMessage("Category must be a valid id"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("actualPrice")
    .notEmpty()
    .withMessage("Actual price is required")
    .isFloat({ min: 0 })
    .withMessage("Actual price must be a positive number"),

  body("offerPrice")
    .notEmpty()
    .withMessage("Offer price is required")
    .isFloat({ min: 0 })
    .withMessage("Offer price must be a positive number")
    .custom((value, { req }) => {
      if (Number(value) > Number(req.body.actualPrice)) {
        throw new Error("Offer price cannot be greater than actual price");
      }
      return true;
    }),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),
];

export const updateDesignValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Design name must be between 3 and 150 characters"),

  body("categoryId")
    .optional()
    .trim()
    .isUUID()
    .withMessage("Category must be a valid id"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("actualPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Actual price must be a positive number"),

  body("offerPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Offer price must be a positive number")
    .custom((value, { req }) => {
      if (
        req.body.actualPrice !== undefined &&
        Number(value) > Number(req.body.actualPrice)
      ) {
        throw new Error("Offer price cannot be greater than actual price");
      }
      return true;
    }),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),
];

export default {
  createDesignValidator,
  updateDesignValidator,
};