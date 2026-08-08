import api from "./api.js";

export const sendContactMessage = async (data) => {
  try {
    const response = await api.post("/contact", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  sendContactMessage,
};