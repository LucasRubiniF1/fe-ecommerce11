import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = await response.json();
          setUser(userData);  // Aquí defines al usuario con sus datos reales
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAuthenticated(false);
        }
      };

      fetchUserData();
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setUser(userData); // userData es un objeto con la información del usuario, como el id y el nombre
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
