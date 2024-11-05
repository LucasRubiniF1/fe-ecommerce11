import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/'); // Redirige a la página principal después de iniciar sesión
  };

  return (
    <div className="login-page">
      <h2>¡Hola! Para agregar al carrito, ingresá a tu cuenta</h2>
      <button onClick={handleLogin}>Crear cuenta</button>
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default ErrorPage;
