import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:5000/", // Base URL para todas las peticiones
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // O de donde obtengas el token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
