import React, { useState } from "react";
import "../styles/editMyAccount.css";
import SuccessAlertModal from "../components/SuccessAlertModal"; // Importa el componente
import axios from "axios";
import { API_URL } from "../utils"; // Cambia esto según tu configuración

const EditAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSaveChanges = async () => {
    try {
      const updatedData = { username, email };
      await axios.put(`${API_URL}/users/1`, updatedData); // Ajusta la URL y el ID según sea necesario

      setShowModal(true); // Muestra el modal al guardar los cambios

      console.log("Cambios guardados:", { username, email });
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="edit-account-container">
      <h2>Edita tu cuenta</h2>
      <SuccessAlertModal show={showModal} onClose={handleCloseModal} />

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Ejemplo: Juan Cruz"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Ejemplo: example@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleSaveChanges}>
        Guardar cambios
      </button>
    </div>
  );
};

export default EditAccount;
