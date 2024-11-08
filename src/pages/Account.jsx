import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/account.css";
import EditButton from "../components/EditButton";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users`, {
          params: { id: userId },
        });
=======
  // Obtén el usuario logueado desde localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      fetchUserData(user.id); // Usa el ID del usuario almacenado en localStorage
    } else {
      setError("Usuario no autenticado");
      setLoading(false);
    }
  }, []);
>>>>>>> 0c75ba4cddb6a8e7c6d5c514f7438844ae71fdd0

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      if (response.data) {
        setUserData(response.data);
      } else {
        setError("Usuario no encontrado");
      }
    } catch (error) {
      setError("Error al obtener los datos del usuario");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <img
          src="./img/usuario1.avif"
          alt="Profile"
          className="profile-image"
        />
        <h2>{userData.username}</h2>
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
              Nombre y apellido: {userData.firstname} {userData.lastname}
            </p>
            <p>Nombre de usuario: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>
          <div className="account-card">
            <h3>
              Información de envio <span>Edit</span>
            </h3>
            <p>Direccion de envio: {userData.address}</p>
            <p>Localidad: {userData.city}</p>
            <p>Codigo postal: {userData.postalCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
