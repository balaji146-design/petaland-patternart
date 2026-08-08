// import api from "./api.js";

// export const getCategories = async () => {
//   try {
//     const response = await api.get("/categories");
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getCategory = async (id) => {
//   try {
//     const response = await api.get(`/categories/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export default {
//   getCategories,
//   getCategory,
// };

import api from "./api.js";

export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getCategories,
  getCategoryById,
};