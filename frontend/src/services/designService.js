import api from "./api.js";

export const getAllDesigns = async (params = {}) => {
  try {
    const response = await api.get("/designs", { params });
    return response.data.data || response.data;
  } catch (error) {
    throw error;
  }
};

export const getDesignById = async (id) => {
  try {
    const response = await api.get(`/designs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedDesigns = async () => {
  try {
    const response = await api.get("/designs/featured");
    return response.data.data || response.data;
  } catch (error) {
    throw error;
  }
};

export const createDesign = async (data) => {
  try {
    const isFormData = data instanceof FormData;
    const response = await api.post("/designs", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDesign = async (id, data) => {
  try {
    const isFormData = data instanceof FormData;
    const response = await api.put(`/designs/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDesign = async (id) => {
  try {
    const response = await api.delete(`/designs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllDesigns,
  getDesignById,
  getFeaturedDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
};