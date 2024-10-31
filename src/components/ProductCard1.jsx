import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const ProductCard1 = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleClick = (product) => {
    navigate(`/product/${product.product_id}`, { state: product });
  };

  return (
    <div className="relative border rounded-lg p-4 shadow-sm">
      {/* Icono de corazón para favoritos */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-red-500 text-lg focus:outline-none"
      >
        <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
      </button>

      {/* Información del producto */}
      <div 
                key={product.product_id} 
                className="border rounded-lg p-4 shadow-lg transition-transform duration-300 transform hover:scale-105"
                onClick={() => handleClick(product)}
              >
                <img
                  src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
                  alt={product.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-green-500 font-bold mt-2">${product.price}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
              </div>

      {/* Capacidades del producto */}
      <div className="flex items-center gap-2 mt-2">
        {product.capacities?.map((capacity, index) => (
          <span key={index} className="text-gray-600 border rounded-full px-2 py-1">
            {capacity}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductCard1;
