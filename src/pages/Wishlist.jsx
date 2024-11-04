import React, { useState } from 'react';
import useStore from '../hooks/store.js';
import { FaTrash, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useStore();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 8;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FaRegHeart className="text-red-500" size={24} />
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-sm text-gray-500 ml-2">({wishlist.length} items)</span>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <FaRegHeart className="mx-auto text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500">Start adding some items to your wishlist!</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            <AnimatePresence>
              {wishlist.slice(startIndex, startIndex + itemsPerPage).map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
                >
                  <div className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative aspect-square bg-gray-50">
                      <img
                        src={product.images || 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp'}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <p className="text-xs font-medium text-gray-600">Stock: {product.stock}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[2.5rem]">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-gray-900">
                          ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                        </p>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {wishlist.length > itemsPerPage && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setStartIndex(prev => Math.max(0, prev - itemsPerPage))}
              disabled={startIndex === 0}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setStartIndex(prev => Math.min(wishlist.length - itemsPerPage, prev + itemsPerPage))}
              disabled={startIndex + itemsPerPage >= wishlist.length}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;