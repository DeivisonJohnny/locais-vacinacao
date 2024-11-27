import axios, { InternalAxiosRequestConfig } from "axios";

const Api = axios.create({
  baseURL: process.env.API_VACINACAO_URL || "http://localhost:6060",
});

Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}asdas`;
      config.headers["Content-Type"] = "application/json"
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
