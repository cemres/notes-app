import axios from "axios";
import { refreshToken } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8083/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.error !== "Null refresh token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error("Error renewing access token:", error);
        throw error;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
