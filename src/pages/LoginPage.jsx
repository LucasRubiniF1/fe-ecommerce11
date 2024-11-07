// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error al cargar los usuarios. Intente de nuevo más tarde.");
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = ({ email, password }) => {
    setError(null); // Limpiar errores previos

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setError("Usuario o contraseña incorrectos.");
      return;
    }

    const token = generateToken(); // Simula o recupera el token (puedes ajustar según tu lógica)

    // Inicia sesión y redirige según el rol
    if (user.role === "ADMIN") {
      login(token, { name: user.firstname, id: user.id });
      navigate('/homeAdmin');
    } else {
      login(token, { name: user.firstname, id: user.id });
      navigate('/');
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2); // Genera un token simulado
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}
        <LoginForm
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    </div>
  );
};

export default LoginPage;
