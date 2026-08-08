import Category from "../models/Category.js";

export async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.getAll();

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getCategoryById(req, res, next) {
  try {
    const { id } = req.params;

    const category = await Category.getById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  getAllCategories,
  getCategoryById,
};