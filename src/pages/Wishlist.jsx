import React, { useState, useEffect } from 'react';
import useStore from '../hooks/UseStore.js';
import { FaTrash, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/UseAuth.js"; 
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wishlist = () => {
  const { wishlist = [], removeFromWishlist,addToCart, initializeWishlist } = useStore(); 
  const { user } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      initializeWishlist(user.id);
    }
  }, [user?.id, initializeWishlist]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        // Paso 1: Obtener el usuario
        const userResponse = await axios.get(`http://localhost:5000/users/${user.id}`);
        const users = userResponse.data;

        // Paso 2: Obtener los objetos wishlist del usuario
        const wishlistItems = users.wishlist || [];

        // Paso 3: Obtener los productId de la wishlist
        const productIds = wishlistItems.map((item) => item.product_id);

        // Paso 4: Hacer una solicitud para obtener los productos relacionados con los productId
        const productRequests = productIds.map((id) =>
          axios.get(`http://localhost:5000/products/${id}`)
        );
        const productResponses = await Promise.all(productRequests);
        const products = productResponses.map((res) => res.data);

        // Paso 5: Guardar los productos en el estado
        setWishlistProducts(products);
      } catch (error) {
        console.error('Error al obtener la wishlist y los productos:', error);
      }
    };

    fetchWishlistProducts();
  }, [wishlist, user?.id]);

  const handleClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {wishlistProducts.map((product) => {
        // Evalúa `isInWishlist` para cada producto.
        const isInWishlist = wishlist.some((item) => item.id === product.id);

        return (
          <div
            key={product.id}
            className="group relative border-0 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 bg-white overflow-hidden"
          >
            {/* Badge de stock */}
            <div className="absolute top-4 right-4 bg-gray-50 px-3 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-600">Stock: {product.stock}</p>
            </div>

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
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            </div>

            {/* Botones con efecto hover */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => addToCart(product, user.id)}
                className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <FaShoppingCart size={11} />
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(product.id, user.id)}
                className={`p-3 rounded-xl border ${
                  isInWishlist ? 'text-black border-black' : 'text-gray-600 border-gray-200'
                } hover:text-red-500 hover:border-red-500 transition-colors duration-300`}
              >
                <FaHeart size={20} className={'text-rose-600'} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Wishlist;
