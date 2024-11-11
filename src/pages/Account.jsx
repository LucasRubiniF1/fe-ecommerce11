import React from 'react';
import { useAuth } from "../hooks/UseAuth";
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
          src="./img/usuario1.avif" // Coloca aquí el enlace a la imagen de perfil
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
            <p>Nombre de usuario: {user.firstname}</p>
            <p>Email: {user.email}</p>
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
