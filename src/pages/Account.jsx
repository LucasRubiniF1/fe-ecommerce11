import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import EditButton from "../components/EditButton";
import { getUserById } from "../Services/serviceLogin";

const Account = () => {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirigir a otras páginas

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!authUser || !authUser.id) {
          throw new Error("Usuario no está autenticado");
        }

        const userData = await getUserById(authUser.id);
        setUser(userData);
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresca la página al cerrar sesión
  };

  const handleRegisterAdmin = () => {
    navigate("/register-admin"); // Redirige a la página de registro de admin
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="error-container">
        <p>{error || "No estás logueado"}</p>
      </div>
    );
  }

  return (
    <div className="account-container admin-view">
      <div className="account-header">
        <img src="./img/usuario1.avif" alt="Profile" className="profile-image" />
        <h1>Bienvenido, {user.firstname}</h1>
      </div>
      <div className="account-content">
        <div className="personal-info">
          <h2>Información Personal</h2>
          <p>
          <p>
            <strong>Nombre:</strong> {user.firstname}
          </p>
          <p>
            <strong>Apellido:</strong> {user.lastname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong> {user.birth}
          </p>
          </p>
        </div>
        <p>
        <button className="register-admin-button" onClick={handleRegisterAdmin}>
          Registrar Administrador
        </button>
        </p>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
        
      </div>
    </div>
  );
};

export default Account;
