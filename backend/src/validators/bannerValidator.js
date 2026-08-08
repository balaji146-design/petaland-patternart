import { body } from "express-validator";

export const uploadBannerValidator = [
  body().custom((value, { req }) => {
    if (!req.file && (!req.files || req.files.length === 0)) {
      throw new Error("Banner image is required");
    }
    return true;
  }),

  body("title")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Banner title must not exceed 150 characters"),

  body("subtitle")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage("Banner subtitle must not exceed 250 characters"),
];

export const updateBannerValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Banner title must not exceed 150 characters"),

  body("subtitle")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage("Banner subtitle must not exceed 250 characters"),
];

export default {
  uploadBannerValidator,
  updateBannerValidator,
};