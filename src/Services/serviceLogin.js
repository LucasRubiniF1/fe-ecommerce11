import axios from "axios";
import axiosClient from "./axiosClient";

// Autenticación de usuario
export const authenticate = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", {
      email,
      password,
    });

    const { userId, username, role, access_token } = response.data;
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("userId", response.data.userId);

    console.log("Respuesta del backend:", response.data);

    return {
      userId,
      email,
      access_token,
    };
  } catch (error) {
    console.error("Error during authentication:", error.response?.data || error.message);
    throw new Error("Error during authentication");
  }
};

// Inicio de sesión
export const login = async (email, password) => {
  try {
    const response = await axiosClient.post("/api/v1/auth/login", {
      email,
      password,
    });

    const { id, username, role, token } = response.data;

    // Guarda el token en localStorage para futuras solicitudes
    console.log("Respuesta del backend:", response.data);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user_id);

    return {
      uaer_id,
      username,
      email,
      role,
      token,
    };
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("Credenciales incorrectas");
    }
    console.error("Error during login:", error.response?.data || error.message);
    throw new Error("Error during login");
  }
};

// Validar usuario antes de registrar
export const validateUser = async (formData, setError) => {
  try {
    const response = await axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${yourToken}`
        }
      });
    const users = response.data;

    const userExists = users.some(
      (user) => user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      setError("Ya existe el username o el email. Intente nuevamente.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error al validar usuario:", error.response?.data || error.message);
    return false;
  }
};

// Registrar un usuario
export const registerUser = async (formData, setError) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v1/auth/register", formData);
    console.log(response.data);

    // Devuelve los datos del usuario registrado
    return response.data;
    
  } catch (error) {
    console.error("Error al registrar el usuario:", error.response?.data || error.message);
    setError("No se pudo registrar el usuario. Intenta nuevamente más tarde.");
    throw new Error("Error al registrar el usuario");
  }
};

// Obtener todos los usuarios
export const getUsersAxios = async () => {
  try {
    const response = await axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${yourToken}`
        }
      });
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error.response?.data || error.message);
    throw new Error("Error al obtener usuarios");
  }
};

export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Asegúrate de enviar el token en el header
        },
      });
  
      console.log("Detalles del usuario:", response.data);
      return response.data;  // Devuelve los datos completos del usuario
    } catch (error) {
      console.error("Error al obtener los detalles del usuario:", error.response?.data || error.message);
      throw new Error("Error al obtener los detalles del usuario");
    }
  };
  
