import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import useFetch from '../hooks/useFetch';
import { API_URL } from '../utils/Utilis';
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetch(`${API_URL}/data/products.json`);

  const foundProduct = products ? products.find(product => product.id === parseInt(id)) : null;

  const handleSubmit = async (formData) => {
    try {
      await axios.put(`${API_URL}/data/products/${id}`, formData); // Cambia la URL si es necesario
      navigate(`/product/${id}`); // Redirigir a la página del producto después de la edición
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>Error fetching product: {error.message}</p>;
  }

  if (!foundProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Product</h1>
      <ProductForm product={foundProduct} onSubmit={handleSubmit} />
    </div>
  );
};

export default ProductEdit;
