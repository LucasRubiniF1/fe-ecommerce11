import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../Services/serviceLogin.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await authenticate(email, password);

      // Store the user and token in localStorage
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", response.token);

      // Load the cart and wishlist from localStorage if they exist
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]); // Initialize cart as empty if none exists
      }

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      } else {
        setWishlist([]); // Initialize wishlist as empty if none exists
      }

      // Redirect based on user role
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
    setCart([]); // Clear the cart in state
    setWishlist([]); // Clear the wishlist in state
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart"); // Remove cart from localStorage
    localStorage.removeItem("wishlist"); // Remove wishlist from localStorage
    navigate("/");
  };
  
  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, cart, wishlist, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
