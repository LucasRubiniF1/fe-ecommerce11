// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [error, setError] = useState(null);

  // Redirigir si no se proporcionan datos de producto
  useEffect(() => {
    if (!product) {
      setError("Producto no encontrado. Redirigiendo a la página principal...");
      setTimeout(() => navigate("/"), 3000); // Redirige después de 3 segundos
    }
  }, [product, navigate]);

  if (error) {
    return (
      <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: '600px', marginTop: '20px' }}>
      <h2 className="text-3xl font-semibold mb-4">{product.name || 'Nombre no disponible'}</h2>
      <img
        src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
        alt={product.name || 'Imagen no disponible'}
        className="w-full h-80 object-contain mb-6"
      />
      <p className="text-lg">{product.description || 'Descripción no disponible'}</p>
      <p className="text-2xl font-bold text-green-500 my-4">${product.price || 'Precio no disponible'}</p>
      <p className="text-gray-500">Stock: {product.stock ?? 'No especificado'}</p>
    </Container>
  );
};

export default ProductDetail;
