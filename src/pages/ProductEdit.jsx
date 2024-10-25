import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import useFetch from '../hooks/useFetch';
import { API_URL } from "../utils";
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetch(`${API_URL}/data/products.json`);
  const [editingProduct, setEditingProduct] = useState(null);

  // Encuentra el producto que se está editando
  const foundProduct = products ? products.find(product => product.id === parseInt(id)) : null;

  const handleSubmit = async (formData) => {
    try {
      await axios.put(`${API_URL}/data/products/${id}`, formData); // Cambia la URL si es necesario
      navigate(`/product/${id}`); // Redirigir a la página del producto después de la edición
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/data/products/${id}`); // Cambia la URL si es necesario
      navigate('/products'); // Redirigir a la lista de productos después de eliminar
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  if (!foundProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
      <h1>Edit Product</h1>
      <div style={{ marginBottom: '20px' }}>
        <ProductForm product={foundProduct} onSubmit={handleSubmit} />
      </div>
      <button 
        onClick={handleDelete} 
        style={{ 
          padding: '10px 15px', 
          backgroundColor: '#e74c3c', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        Delete Product
      </button>
    </div>
  );
};

export default ProductEdit;
