import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/notfound.css"; // Archivo CSS para los estilos personalizados

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div className="not-found-container">
      <h1>Ups..! 😕</h1>
      <p>La página que estás intentando buscar no se encuentra disponible.</p>
      <button className="go-home-button" onClick={handleGoHome}>
        Volver al inicio
      </button>
    </div>
  );
};

export default NotFound;
