import React, { useState, useEffect } from "react";
import axios from "axios"; // Importa Axios
import "../styles/account.css";
import EditButton from "../components/EditButton";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Para mostrar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  const userId = 1; // Simulamos un usuario logueado

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users`, {
          params: { user_id: userId },
        });

        // Axios ya convierte la respuesta en JSON automáticamente
        if (response.data.length > 0) {
          setUserData(response.data[0]);
        } else {
          setError("Usuario no encontrado");
        }
      } catch (error) {
        setError("Error al obtener los datos del usuario");
      } finally {
        setLoading(false); // Quitamos el estado de carga
      }
    };

    fetchUserData();
  }, [userId]);

  // Si está en estado de carga, mostramos un mensaje
  if (loading) {
    return <p>Loading...</p>;
  }

  // Si hay un error, lo mostramos
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <img
          src="./img/usuario1.avif" // Coloca aquí el enlace a la imagen de perfil
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
            <p>Nombre de usuario: {userData.firstname}</p>
            <p>Email: {userData.email}</p>
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
