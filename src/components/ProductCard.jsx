import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const placeholderImage = 'https://via.placeholder.com/150'; // Imagen por defecto
  const productImage = product.images || placeholderImage;

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px' }}>
      <Link to={`/product/${product.id}`}>
        <img src={productImage} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
      </Link>
    </div>
  );
};

export default ProductCard; 
