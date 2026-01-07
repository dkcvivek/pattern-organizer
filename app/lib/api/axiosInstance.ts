import axios, { Axios } from "axios";
import { apiConfig } from "./apiConfig";

const axiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  withCredentials: true,
});

let isRefreshing = false;

const clearTokenData = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
};

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers && !config.headers["Content-Type"]) {
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    }

    if (config.headers) {
      config.headers["Accept"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.error_status === true) {
      return Promise.reject(
        new Error(response.data.message || "Something went wrong")
      );
    }
    return response;
  },
  async (error) => {
    const failedRqst = error.config;

    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    if (error.response.status === 401 && !failedRqst._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      failedRqst._retry = true;
      isRefreshing = true;

      if (typeof window === "undefined") return Promise.reject("error");
      const response = await axios.post(
        "/api/auth/refresh",
        {},
        { withCredentials: true }
      );

      const refreshToken = response.data?.success ? true : false;
      
      if (!refreshToken) {
        clearTokenData();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // update the url here
        const response = await axios.post("", { refresh: refreshToken });

        if (response.data.error_status === false && response.data.data) {
          localStorage.setItem("access_token", response.data.data.access);
          failedRqst.headers.Authorization = `Bearer ${response.data.data.access}`;
          processQueue(null, response.data.data.access);

          isRefreshing = false;

          return axiosInstance(failedRqst);
        } else {
          throw new Error("Token refresh failed.");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        clearTokenData();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";

    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
