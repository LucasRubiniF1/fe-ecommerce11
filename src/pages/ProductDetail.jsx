import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
    </div>
  );
};

export default ProductDetail;
