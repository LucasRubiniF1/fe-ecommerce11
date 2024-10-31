import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCart, BsHeart } from 'react-icons/bs'; 
import useStore from "../hooks/store.js";

const Carousel = ({ products, titulo }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const navigate = useNavigate();

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
              className="border rounded-lg p-4 shadow-lg transition-transform duration-300 transform hover:scale-105 bg-white"
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

              {/* Botones con iconos */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition"
                >
                  <BsCart size={24} /> {/* Icono del carrito */}
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
                >
                  <BsHeart size={24} /> {/* Icono de wishlist */}
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
