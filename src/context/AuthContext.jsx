import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../Services/serviceLogin.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return JSON.parse(savedUser) ?? null;
  });
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await authenticate(username, password);

      // Almacenar el usuario y el token en localStorage
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);

      // Cargar el carrito desde localStorage si existe
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]); // Si no hay carrito, lo inicializamos como vacío
      }

      // Redirigir a la página correspondiente según el rol del usuario
      if (response.role === "ADMIN") {
        navigate('/HomeAdmin');  
      } else { 
        navigate('/');    
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]); // Limpiar el carrito en el estado global
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
    navigate("/");
  };

  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, cart, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
