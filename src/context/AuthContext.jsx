import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../Services/serviceLogin.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return JSON.parse(savedUser) ?? null;
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await authenticate(username, password);

      setUser(response);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("token", user.access_token);
      if (user) {
        if (user.role === "ADMIN") {
          localStorage.setItem("token", user.access_token);
          navigate('/HomeAdmin');  
          
        } else { 
          localStorage.setItem("token", user.access_token);
          navigate('/');    
        }}
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
