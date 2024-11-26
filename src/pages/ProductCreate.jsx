import React, { useState, useEffect } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import ProductForm from "../components/ProductForm";

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    isFeatured: false,
    images: "", // Cambiado para ser compatible con el backend
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Manejar la creación del producto
  const handleSubmit = async (formData) => {
    // Validación de campos requeridos
    /*if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category || !formData.images) {
      setError('Todos los campos son obligatorios.');
      return;
    }*/
  
    setError(null);
    setSuccess(false);
  
    try {
      // Agregar `visto` como `true` y `orderDetails` como array vacío
      const payload = {
        ...formData,
        visto: true, // Se establece automáticamente en true
        orderDetails: [], // Hardcodeamos este campo
      };
  
      // Obtener el token desde el localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
      }
  
      // Configurar el encabezado con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(`http://localhost:8080/products/create`, payload, config);
      setSuccess('Producto creado exitosamente.');
  
      // Restablecer el formulario después de un breve retraso
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          isFeatured: false,
          images: '', // Resetear URL de la imagen
        });
      }, 2000);
  
    } catch (error) {
      console.error("Error creando producto:", error.response?.data || error.message);
      setError('Error al crear el producto.');
    }
  };

  if (loading) {
    return (
      <Container style={{ maxWidth: "600px", marginTop: "20px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: "600px", marginTop: "20px" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <ProductForm product={formData} onSubmit={handleSubmit} />
    </Container>
  );
};

export default ProductCreate;
