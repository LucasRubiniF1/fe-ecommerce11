import React from 'react';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useStore from "../hooks/UseStore.js";
import { useAuth } from "../hooks/UseAuth.js"; 
const Cards = ({products}) => {
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useStore();
  const { user } = useAuth();

  const handleAddToWishlist = (product) => {
    if (!user) {
      navigate('/login');
    } else {
      addToWishlist(product.id, user.id);
    }
  };
  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product.id, user.id);
  };
  const handleClick = (product) => {
    navigate(`/product/${product.product_id}`, { state: product });
  };

  const handleAddToCart = async (product) => {
    if (!user || !user.id) {
      console.error("Usuario no autenticado o ID no definido.");
      navigate('/login');
    } else {
      await addToCart(product, user.id);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // Evalúa `isInWishlist` para cada producto.
        const isInWishlist = wishlist.some((item) => item.product_id == product.id);

        return (
          <div
            key={product.product_id}
            className="group relative border-0 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 bg-white overflow-hidden"
          >
            {/* Contenedor de imagen con efecto hover */}
            <div
              className="relative mb-6 rounded-xl bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
              onClick={() => handleClick(product)}
            >
              <img
                src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
                alt={product.name}
                className="w-full h-48 object-contain mix-blend-multiply"
              />
            </div>

            {/* Contenido de texto */}
            <div className="space-y-2 cursor-pointer" onClick={() => handleClick(product)}>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
              <p className="text-sm font-bold text-gray-500 line-clamp-2 min-h-[2.5rem]">Stock: {product.stock}</p>
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            </div>

            {/* Botones con efecto hover */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <FaShoppingCart size={11} />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  if (isInWishlist) {
                    handleRemoveFromWishlist(product);
                  } else {
                    handleAddToWishlist(product);
                  }
                }}
                className={`p-3 rounded-xl border ${
                  isInWishlist ? 'text-black border-black' : 'text-gray-600 border-gray-200'
                } hover:text-red-500 hover:border-red-500 transition-colors duration-300`}
              >
                <FaHeart size={20} className={isInWishlist ? 'text-rose-600' : 'text-gray-600'} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
