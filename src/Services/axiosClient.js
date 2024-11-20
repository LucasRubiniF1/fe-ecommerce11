// src/api/axiosClient.js
import axios from "axios";
 
// Crea una instancia de Axios
const axiosClient = axios.create({
    baseURL: "https://localhost:8080/",
    withCredentials: true,
});
 
// Agrega el token a las solicitudes automáticamente
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el token al header
    }
    return config;
});
 
export default axiosClient;