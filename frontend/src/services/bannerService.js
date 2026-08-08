import api from "./api.js";

export const getBanner = async () => {
  try {
    const response = await api.get("/banners");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadBanner = async (data) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await api.post("/banners", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBanner = async (id, data) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await api.put(`/banners/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBanner = async (id) => {
  try {
    const response = await api.delete(`/banners/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getBanner,
  uploadBanner,
  updateBanner,
  deleteBanner,
};