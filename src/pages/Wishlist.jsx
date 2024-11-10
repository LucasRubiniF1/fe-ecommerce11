import React, { useState, useEffect } from 'react';
import useStore from '../hooks/UseStore.js';
import { FaTrash, FaRegHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/UseAuth.js"; 

const Wishlist = () => {
  const { wishlist = [], removeFromWishlist, initializeWishlist } = useStore(); // Default to empty array
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 8;
  const defaultImage = 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp';
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      initializeWishlist(user.id); // Initialize wishlist based on user ID
    }
  }, [user?.id, initializeWishlist]);

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
                <motion.div key={product.id} layout>
                  <div className="product-card">
                    <img src={product.images} alt={product.name} />
                    <p>{product.name}</p>
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
