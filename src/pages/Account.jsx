import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import EditButton from "../components/EditButton";
import { getUserById } from "../Services/serviceLogin"; // Función modular para obtener datos del usuario

const Account = () => {
  const { user: authUser, logout } = useAuth(); // Obtener datos del usuario autenticado y la función logout
  const [user, setUser] = useState(null); // Estado para los datos del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!authUser || !authUser.id) {
          throw new Error("Usuario no está autenticado");
        }

        const userData = await getUserById(authUser.id); // Usar la función para obtener datos del usuario
        setUser(userData); // Guardar los datos en el estado
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  const handleOrders = () => {
    navigate("/checkout-history"); // Redirigir al historial de órdenes
  };

  const handleWishlist = () => {
    navigate("/wishlist"); // Redirigir a la lista de favoritos
  };

  const handleLogout = () => {
    logout(); // Cerrar sesión
    navigate("/"); // Redirigir a la página principal
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-md shadow-sm">
          <p className="text-center text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-md shadow-sm">
          <p className="text-center text-gray-600">{error || "No estás logueado"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <img
          src="./img/usuario1.avif"
          alt="Profile"
          className="profile-image"
        />
        <h2>{user.username}</h2>
        <ul>
          <li onClick={handleOrders}>Órdenes</li>
          <li onClick={handleWishlist}>Lista de Favoritos</li>
          <li onClick={handleLogout}>Salir de mi cuenta</li>
        </ul>
      </div>

      <div className="account-content">
        <h1>Mi cuenta</h1>
        <div className="addresses">
          <div className="address-card">
            <h3>
              Información personal <EditButton to="/edit-account" />
            </h3>
            <p>
              Nombre y apellido: {user.firstname} {user.lastname}
            </p>
            <p>Nombre de usuario: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Fecha de Nacimiento: {user.birth}</p>
          </div>
          <div className="account-card">
            <h3>
              Información de envío <span>Edit</span>
            </h3>
            <p>Dirección de envío: {user.shippingAddress || "No registrada"}</p>
            <p>Localidad: {user.city || "No registrada"}</p>
            <p>Código postal: {user.postalCode || "No registrado"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;



