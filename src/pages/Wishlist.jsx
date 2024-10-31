import React, { useState } from 'react';
import useStore from '../hooks/store.js';
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";



const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useStore();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  console.log(wishlist);
  
  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>

          {wishlist.slice(startIndex, startIndex + itemsPerPage).map((product) => (
            <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden"
                  >
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
                
                
                <div className='flex justify-between'>
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                    >
                    <FaTrash size={20} color='red'/>
                  </button>

                </div>
              </div>


            </div>
            </motion.div>
          ))}
        </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
