import React from "react";
import { useAuth } from "../hooks/UseAuth";
import "../styles/account.css";
import EditButton from "../components/EditButton";
import { FaUserCircle } from "react-icons/fa";

const Account = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-md shadow-sm">
          <p className="text-center text-gray-600">No estás logueado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <img
          src="./img/usuario1.avif" //aca pusimos la imagen del perfil
          alt="Profile"
          className="profile-image"
        />
        <h2>{user.username}</h2>
        <ul>
          <li>Cuenta</li>
          <li>Órdenes</li>
          <li>Lista de Favoritos</li>
          <li>Salir de mi cuenta</li>
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
          </div>
          <div className="account-card">
            <h3>
              Información de envio <EditButton to="/edit-account" />
            </h3>
            <p>
              Direccion de envio: {user.shipping_address || "No disponible"}
            </p>
            <p>Localidad: {user.locality || "No disponible"}</p>
            <p>Codigo postal: {user.postal_code || "No disponible"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
