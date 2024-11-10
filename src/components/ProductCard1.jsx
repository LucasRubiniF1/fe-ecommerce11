import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useStore from "../hooks/UseStore.js";

const ProductCard1 = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useStore(); 

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className="relative border rounded-lg p-4 shadow-sm">


      {/* Información del producto */}
      <div 
                key={product.id}
                className="group relative border-0 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 bg-white overflow-hidden">
                {/* Badge de stock */}
                <div className="absolute top-4 right-4 bg-gray-50 px-3 py-1 rounded-full">
                  <p className="text-xs font-medium text-gray-600">Stock: {product.stock}</p>
                </div>
              
                {/* Contenedor de imagen con efecto hover */}
                <div className="relative mb-6 rounded-xl bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
                onClick={() => handleClick(product)}>
                  <img
                    src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
                    alt={product.name}
                    className="w-full h-48 object-contain mix-blend-multiply"
                  />
                </div>
              
                {/* Contenido de texto */}
                <div className="space-y-2 cursor-pointer" 
                onClick={() => handleClick(product)}>
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                </div>
              
                {/* Botones con efecto hover mejorado */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <FaShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {addToWishlist(product); toggleFavorite();}}
                    
                    className="p-3 rounded-xl border border-gray-200 text-gray-600 text-red-500 text-lg focus:outline-none "
                  >
                    <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
                    
                  </button>
                </div>
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
