import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/editMyAccount.css"; // Importa los estilos que desees

const API_URL = "http://localhost:5000"; // Reemplaza con tu URL si es diferente

const EditAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingField, setEditingField] = useState(null); // Campo que se está editando
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Obtener los datos del usuario logueado desde localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUsername(user.username);
      setEmail(user.email);
      setPassword(user.password); // Si no manejas contraseñas, omite esto
      setUserId(user.id); // Asegúrate de que el ID esté presente en los datos del usuario
    } else {
      alert("Usuario no autenticado");
      // Puedes redirigir al login si es necesario
    }
  }, []);

  const handleSaveChanges = async () => {
    const updatedUserData = {
      username,
      email,
      password,
    };

    if (!userId) {
      console.error("No se encontró el ID del usuario");
      alert("Error al guardar los cambios. Intente de nuevo.");
      return;
    }

    try {
      console.log("Intentando guardar cambios...");
      const response = await axios.put(
        `${API_URL}/users/${userId}`,
        updatedUserData
      );
      console.log("Cambios guardados exitosamente:", response.data);

      // Actualizar el usuario en localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      alert("Cambios guardados correctamente");
      setEditingField(null); // Finaliza la edición
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Error al guardar los cambios");
    }
  };

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  return (
    <div className="edit-account-container">
      <h2>Edita tu cuenta</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={editingField !== "username"}
        />
        <button onClick={() => handleEditClick("username")}>Editar</button>
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={editingField !== "email"}
        />
        <button onClick={() => handleEditClick("email")}>Editar</button>
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={editingField !== "password"}
        />
        <button onClick={() => handleEditClick("password")}>Editar</button>
      </div>

      <button className="btn-save" onClick={handleSaveChanges}>
        Guardar cambios
      </button>
    </div>
  );
};

export default EditAccount;
