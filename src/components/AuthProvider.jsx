// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Opcionalmente, podrías hacer una solicitud para obtener el usuario por el token
      setUser({ name: "Nombre de Usuario", token }); // Ajusta según el nombre real del usuario
      console.log(token);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    setUser(userData); // userData es un objeto con la información del usuario, como el nombre
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





