import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 422) {
      console.error('Validation Error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
