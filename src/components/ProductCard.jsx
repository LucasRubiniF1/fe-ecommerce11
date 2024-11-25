import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Decodificación de la URL de la imagen
  const decodeImageUrl = (base64String) => {
    try {
      return atob(base64String);
    } catch (error) {
      console.error("Error decoding Base64 string:", error);
      // Imagen por defecto si hay un error en la decodificación
      return 'https://via.placeholder.com/150';
    }
  };

  // Decodificar o usar imagen predeterminada
  const productImage = decodeImageUrl(product.images);

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px' }}>
      <Link to={`/product/${product.id}`}>
        <img
          src={productImage}
          alt={product.name}
          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
      </Link>
    </div>
  );
};

export default ProductCard;
