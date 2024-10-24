import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ProductForm from '../components/ProductForm';
import axios from 'axios';
import { API_URL } from '../utils/Utilis'; // Asegúrate de que esta ruta sea correcta

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`${API_URL}/products/${id}`);

  const handleEditSubmit = async (updatedProduct) => {
    try {
      await axios.put(`${API_URL}/products/${id}`, updatedProduct);
      navigate('/'); // Redirigir a la página principal o donde desees
    } catch (error) {
      console.error('Error updating product:', error);
      // Manejar el error adecuadamente, quizás mostrar un mensaje al usuario
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error fetching product: {error.message}</p>;
  if (!product) return <p>No product found</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Product</h1>
      <ProductForm product={product} onSubmit={handleEditSubmit} />
    </div>
  );
};

export default ProductEdit;
