<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
=======
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { API_URL } from "../utils";
import ErrorAlert from '../components/ErrorAlert';
>>>>>>> main

const ProductDetail = () => {
  const { id } = useParams();
  const { data: products, loading, error } = useFetch(`${API_URL}/data/products.json`);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <ErrorAlert message={error.message} />;
  }

  const foundProduct = products ? products.find(product => product.id === parseInt(id)) : null;

  if (!foundProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <img src={foundProduct.images || 'https://via.placeholder.com/300'} alt={foundProduct.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <h1>{foundProduct.name}</h1>
      <p>{foundProduct.description}</p>
      <strong>${foundProduct.price}</strong>
      <Link to={`/product/edit/${foundProduct.id}`}>Edit Product</Link>
    </div>
  );
};

export default ProductDetail;
