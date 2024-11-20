import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:8080/", // Base URL para todas las peticiones
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
