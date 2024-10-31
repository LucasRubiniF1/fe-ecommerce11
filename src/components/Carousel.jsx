import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useStore from "../hooks/store.js";

const Carousel = ({ products, titulo }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);


  const { addToCart, addToWishlist } = useStore(); 

  const nextPage = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


  const handleClick = (product) => {
    navigate(`/product/${product.product_id}`, { state: product });
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">{titulo}</h2>
      <div className="flex items-center">
        <button
          onClick={prevPage}
          disabled={startIndex === 0}
          className="mr-4 p-2 bg-gray-300 rounded-lg"
        >
          ←
        </button>

        

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(startIndex, startIndex + itemsPerPage).map((product) => (
            <div
  key={product.product_id}
  className="group relative border-0 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 bg-white overflow-hidden"
>
  {/* Badge de stock */}
  <div className="absolute top-4 right-4 bg-gray-50 px-3 py-1 rounded-full">
    <p className="text-xs font-medium text-gray-600">Stock: {product.stock}</p>
  </div>

  {/* Contenedor de imagen con efecto hover */}
  <div className="relative mb-6 rounded-xl bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-[1.02]">
    <img
      src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
      alt={product.name}
      className="w-full h-48 object-contain mix-blend-multiply"
    />
  </div>

  {/* Contenido de texto */}
  <div className="space-y-2">
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
      onClick={() => addToWishlist(product)}
      className="p-3 rounded-xl border border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors duration-300"
    >
      <FaHeart size={20} />
    </button>
  </div>
</div>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={startIndex + itemsPerPage >= products.length}
          className="ml-4 p-2 bg-gray-300 rounded-lg"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Carousel;
