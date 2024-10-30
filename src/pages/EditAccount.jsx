import React, { useState } from "react";
import "../styles/editMyAccount.css";

const EditAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSaveChanges = () => {
    console.log("Cambios guardados:", { username, email });
  };

  return (
    <div className="edit-account-container">
      <h2>Edita tu cuenta</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Ejemplo: Juan Cruz"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        />
      </div>

      <button className="btn-save" onClick={handleSaveChanges}>
        Guardar cambios
      </button>
    </div>
  );
};

export default EditAccount;
