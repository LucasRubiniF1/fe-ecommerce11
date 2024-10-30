import React, { useState } from "react";

const EditAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    // Otros campos que el usuario pueda editar
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular acción de edición aquí
    console.log("Datos enviados: ", formData);
  };

  return (
    <div className="edit-account-container">
      <h1>Edita tu cuenta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditAccount;
