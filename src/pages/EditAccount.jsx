import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/editMyAccount.css";

const API_URL = "http://localhost:5000";

const EditAccount = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    birth: "",
    firstname: "",
    lastname: "",
    role: "",
  });
  const [editingField, setEditingField] = useState(null);
  const userId = 4; 


  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => setUserData(response.data))
      .catch((error) =>
        console.error("Error al cargar los datos del usuario:", error)
      );
  }, [userId]);


  const handleSaveChanges = async () => {
    const updatedFields = {
      ...(editingField === "username" && { username: userData.username }),
      ...(editingField === "email" && { email: userData.email }),
      ...(editingField === "password" && { password: userData.password }),
    };

    try {
      await axios.patch(`${API_URL}/users/${userId}`, updatedFields); 
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="edit-account-container">
      <h2>Edita tu cuenta</h2>

      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          disabled={editingField !== "username"}
        />
        <button onClick={() => handleEditClick("username")}>Editar</button>
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          disabled={editingField !== "email"}
        />
        <button onClick={() => handleEditClick("email")}>Editar</button>
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          disabled={editingField !== "password"}
        />
        <button onClick={() => handleEditClick("password")}>Editar</button>
      </div>

      <button
        className="btn-save"
        onClick={handleSaveChanges}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Guardar cambios
      </button>
    </div>
  );
};

export default EditAccount;
