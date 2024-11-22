import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate} from "../Services/serviceLogin.js";

const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState("cart", []);
  const [wishlist, setWishlist] = useState("wishlist", []);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await authenticate(email, password);
      
      console.log("localStorage:", response);

      setUser(response);
      console.log("token: ", localStorage.getItem(token));
      console.log("Token desde localStorage:", response.token); // Log para depurar
      console.log("ID del usuario desde localStorage:", user.userId); // Log para depurar

     

      // Verificar y cargar el carrito y la wishlist desde localStorage si existen
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedCart) {
        setCart(JSON.parse(savedCart)); // Cargar carrito desde localStorage si existe
      } else {
        setCart([]); // Inicializar carrito como vacío si no existe
      }

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist)); // Cargar wishlist desde localStorage si existe
      } else {
        setWishlist([]); // Inicializar wishlist como vacío si no existe
      }

      // Redirigir según el rol del usuario
      if (response.role === "ADMIN") {
        navigate("/HomeAdmin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]); // Limpiar el carrito en el estado
    setWishlist([]); // Limpiar la wishlist en el estado
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); // Eliminar el carrito de localStorage
    localStorage.removeItem("wishlist"); // Eliminar la wishlist de localStorage
    navigate("/");
  };

  useEffect(() => {
    setError(null); // Limpiar el error cuando el usuario cambie
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, cart, wishlist, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
