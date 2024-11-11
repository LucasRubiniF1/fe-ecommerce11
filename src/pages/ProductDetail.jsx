// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useStore from "../hooks/UseStore.js";
import { useAuth } from "../hooks/UseAuth.js"; 


const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [error, setError] = useState(null);
  const { addToCart, addToWishlist} = useStore();
  const { user } = useAuth();

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
  const handleAddToCart = (product) => {
    addToCart(product, user.id);    
  };

  const handleAddToWishlist = (product) => {
      addToWishlist(product.id, user.id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-white rounded-lg shadow-md">
      {/* Sección de Imagen */}
      <div className="flex-1">
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <img
            src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
            alt={product.name}
            className="w-full h-96 object-contain bg-white transition-transform transform hover:scale-105 duration-300"
          />
        </div>
      </div>

      {/* Sección de Detalles */}
      <div className="flex-1 space-y-4">
        {/* Nombre del Producto */}
        <h1 className="text-4xl font-extrabold text-gray-800">{product.name}</h1>

        {/* Descripción del Producto */}
        <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

        {/* Precio */}
        <p className="text-3xl font-semibold text-emerald-600">${product.price}</p>

        {/* Botones de Acciones */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => handleAddToCart(product)}
            className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <FaShoppingCart size={16} />
            Agregar al Carrito
          </button>
          <button
            onClick={() => handleAddToWishlist(product)}
            className={`p-3 rounded-lg border ${
              product.isInWishlist
                ? 'text-red-500 border-red-500'
                : 'text-gray-600 border-gray-300'
            } hover:text-red-600 hover:border-red-600 transition-colors duration-300 flex items-center justify-center shadow-md transform hover:scale-110`}
          >
            <FaHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
