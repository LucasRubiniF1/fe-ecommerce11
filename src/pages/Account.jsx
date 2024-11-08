import React, { useState } from "react";
import axios from "axios";
import "../styles/editMyAccount.css"; // Importa los estilos que desees

const API_URL = "http://localhost:5000"; // Reemplaza con tu URL si es diferente

const EditAccount = () => {
  const [username, setUsername] = useState("pruebaCambio");
  const [email, setEmail] = useState("prueba@example.com");
  const [password, setPassword] = useState("******");
  const [editingField, setEditingField] = useState(null); // Campo que se está editando

  const userId = 1; // Ajusta el ID del usuario según sea necesario

  const handleSaveChanges = async () => {
    const updatedUserData = {
      username,
      email,
      password,
    };

    try {
      console.log("Intentando guardar cambios...");
      await axios.put(${API_URL}/users/${userId}, updatedUserData);
      console.log("Cambios guardados exitosamente");
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
