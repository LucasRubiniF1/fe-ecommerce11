import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
 
// Login
export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/login', { email, password });
        const { token } = response.data; // Token devuelto por el backend
        localStorage.setItem("authToken", token); // Guardar el token
        return token;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    }
};
 
// Logout
export const logout = () => {
    localStorage.removeItem("authToken"); // Eliminar el token
};