// src/components/CreateProduct.jsx
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from "../utils";
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import products from '/public/data/products.json'; 

const ProductCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_id: null,
    name: '',
    price: '',
    description: '',
    images: '',
    stock: '',
    category: '',
    isFeatured: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
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
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetear error al intentar registrar
    setSuccess(false);

    try {
      await axios.post(`${API_URL}/products`, formData);
      setSuccess(true);
      navigate('/');
    } catch (error) {
      setError('Error creating product');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Product created successfully!</Alert>}
      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductCreate;
