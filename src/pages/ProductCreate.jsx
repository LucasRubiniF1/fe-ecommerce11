// src/components/ProductCreate.jsx
import React, { useState, useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from "../utils";
import ProductForm from '../components/ProductForm';

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    product_id: null,
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    isFeatured: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Obtener la lista de productos para determinar el último ID
    axios.get(`${API_URL}/products`)
      .then(response => {
        const products = response.data;
        const lastId = products.length > 0 ? Math.max(...products.map(product => product.product_id)) : 0;
        setFormData(prev => ({ ...prev, product_id: lastId + 1 }));
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
        setError('No se pudo cargar la lista de productos.');
      });
  }, []);

  const handleSubmit = async (formData) => {
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${API_URL}/products`, formData);
      setSuccess(true);
      console.log("Producto creado:", response.data); // Verifica el producto en la consola

      // Restablecer el formulario después de un breve retraso
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          product_id: formData.product_id + 1,
          name: '',
          description: '',
          price: '',
          stock: '',
          category: '',
          isFeatured: false,
        });
      }, 2000); // Puedes ajustar el tiempo según prefieras

    } catch (error) {
      setError('Error al crear el producto');
      console.error("Error creando producto:", error);
    }
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">¡Producto creado exitosamente!</Alert>}
      <ProductForm
        product={formData}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default ProductCreate;
