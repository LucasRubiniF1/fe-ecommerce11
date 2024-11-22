import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/account.css";

const Account = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId"); // Obtener el userId del localStorage

                console.log("Token desde localStorage:", token); // Log para depurar
                console.log("ID del usuario desde localStorage:", userId); // Log para depurar

                if (!token || !userId) {
                    setError("Usuario no está autenticado");
                    setLoading(false);
                    return;
                }

                // Realizar la solicitud al backend para obtener los datos del usuario
                const response = await axios.get(`http://localhost:8080/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log("Datos del usuario recibidos:", response.data);
                    setUserData(response.data);
                } else {
                    setError("No se pudieron obtener los datos del usuario");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error.message);
                setError("No se pudieron obtener los datos del usuario");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>No se encontraron datos del usuario</div>;
    }

    return (
        <div className="account-container">
            <h1>Mi cuenta</h1>
            <p>Nombre: {userData.firstname}</p>
            <p>Apellido: {userData.lastname}</p>
            <p>Email: {userData.email}</p>
            <p>Dirección: {userData.address || "Dirección no disponible"}</p>
        </div>
    );
};

export default Account;




/*import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import EditButton from "../components/EditButton";

const Account = () => {
  const { user: authUser, logout } = useAuth();
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

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado");
        }

        // Llamada al backend para obtener los datos del usuario
        const response = await fetch(`http://localhost:8080/users/${authUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setUser(data); // Guardar los datos del usuario en el estado
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

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

export default Account;*/
