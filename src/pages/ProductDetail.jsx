import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();  // Obtener el id del producto desde la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Fetching product with id: ${id}`);
    fetch('/data/products.json')  // Cargar el archivo JSON local
      .then(response => response.json())
      .then(data => {
        const foundProduct = data.find(p => p.id === id);  // Buscar el producto por id
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <img src={product.images || 'https://via.placeholder.com/300'} alt={product.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
    </div>
  );
};

export default ProductDetail;