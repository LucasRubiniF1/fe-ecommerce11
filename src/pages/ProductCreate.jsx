// src/components/ProductCreate.jsx
import React, { useState, useEffect } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
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
    image: '', // Agregado para URL de la imagen
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener la lista de productos para determinar el último ID
    axios.get(`${API_URL}/products`)
      .then(response => {
        const products = response.data;
        const lastId = products.length > 0 ? Math.max(...products.map(product => product.product_id)) : 0;
        setFormData(prev => ({ ...prev, product_id: lastId + 1 }));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
        setError('No se pudo cargar la lista de productos.');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (formData) => {
    // Validación de campos requeridos
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category || !formData.image) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${API_URL}/products`, formData);
      setSuccess('Producto creado exitosamente.');

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
          image: '', // Resetear URL de la imagen
        });
      }, 2000);

    } catch (error) {
      console.error("Error creando producto:", error);
      setError('Error al crear el producto.');
    }
  };

  if (loading) {
    return (
      <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <ProductForm
        product={formData}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default ProductCreate;
