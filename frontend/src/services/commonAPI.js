import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api`

export const commonAPI = async (method, url, data = {}, config = {}) => {

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
