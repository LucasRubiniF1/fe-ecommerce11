import React from "react";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import EditButton from "../components/EditButton";
import { FaUserCircle } from "react-icons/fa";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-md shadow-sm">
          <p className="text-center text-gray-600">No estás logueado</p>
        </div>
      </div>
    );
  }

  const handleOrders = () => {
    navigate("/checkout-history");
  };

  const handleWishlist = () => {
    navigate("/wishlist");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              Información de envio <span>Edit</span>
            </h3>
            <p>Direccion de envio: XXXXXX</p>
            <p>Localidad: XXXXXX</p>
            <p>Codigo postal: XXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
