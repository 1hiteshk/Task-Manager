import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-manager-backend-pug2.onrender.com/api',
});

// Add a request interceptor to add the token to the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
