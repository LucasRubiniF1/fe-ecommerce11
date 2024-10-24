import React from 'react';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../utils";

const ProductCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await axios.post(`${API_URL}/data/products`, formData); // Cambia la URL si es necesario
      navigate('/'); // Redirigir a la página de búsqueda de productos después de crear
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductCreate;
