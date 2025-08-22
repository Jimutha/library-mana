import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Making API request to:", config.url);
    console.log("Request data:", config.data);

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log("API response received:", response.data);
    return response;
  },
  (error) => {
    console.error("API Error Details:", error);

    if (error.response) {
      // Server responded with error status
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Error request:", error.request);
    } else {
      // Something else happened
      console.error("Error message:", error.message);
    }

    // Provide better error messages
    if (error.response?.data?.error) {
      error.message =
        error.response.data.error.message || "Server error occurred";
    } else if (error.response?.data) {
      error.message = JSON.stringify(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
