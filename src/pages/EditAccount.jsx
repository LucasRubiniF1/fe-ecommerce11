import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils"; // Define la URL base para tus peticiones en utils.js o usa directamente la URL aquí

const EditAccount = () => {
  const userId = 1; // Cambia esto según el ID del usuario actual
  const [userData, setUserData] = useState({});
  const [editedUserData, setEditedUserData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        console.log("Datos del usuario:", response.data); // Verifica que estás obteniendo datos
        setUserData(response.data);
        setEditedUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Error al cargar los datos del usuario.");
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${API_URL}/users/${userId}`, editedUserData);
      setUserData(editedUserData);
      setSuccess("Datos de usuario actualizados exitosamente.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Error al guardar los cambios.");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2>Edita tu cuenta</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={editedUserData.username || ""}
            onChange={handleInputChange}
            placeholder="Ejemplo: JuanCruz"
          />
        </Form.Group>

        <Form.Group controlId="formEmail" style={{ marginTop: "10px" }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={editedUserData.email || ""}
            onChange={handleInputChange}
            placeholder="Ejemplo: example@correo.com"
          />
        </Form.Group>

        <Button
          variant="primary"
          onClick={handleSaveChanges}
          style={{ marginTop: "20px" }}
        >
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditAccount;
