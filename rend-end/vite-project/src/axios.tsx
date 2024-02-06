import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// Request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("3days_emp_token");
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
