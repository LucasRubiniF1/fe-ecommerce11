import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:8080/", // Base URL para todas las peticiones
});

axiosClient.interceptors.request.use(
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


axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirigir al login en caso de autenticación fallida
        } else if (status === 404) {
          window.location.href = "/login"; // Redirigir al login si no se encuentra la ruta
        }
      }
      return Promise.reject(error);
    }
  );
  

export default axiosClient;
