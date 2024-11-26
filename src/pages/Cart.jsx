import React, { useState, useEffect } from 'react';
import useStore from "../hooks/UseStore.js";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutModal from '../components/CheckoutModal.jsx';
import { useAuth } from "../hooks/UseAuth.js";

const Cart = () => {
  const { cart = [], removeFromCart, updateQuantity, checkStock } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      useStore.getState().initializeCart(user.id);
    }
  }, [user?.id]);

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const stockAvailable = await checkStock(itemId, quantity);
      if (stockAvailable) {
        updateQuantity(itemId, quantity, user.id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"></button>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <span className="text-sm text-gray-500">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </header>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500">Add some items to start shopping</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden"
                  >
                    <div className="p-6 flex gap-6">
                      <div className="w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.images || 'https://via.placeholder.com/150'}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-medium text-gray-900 mb-1">
                          {item.name}
                        </h2>
                        <p className="text-gray-500 mb-4">
                          ${item.price.toFixed(2)} per unit
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                              }
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <FaMinus size={12} />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id, user.id)}
                            className="text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                          >
                            <FaTrash size={20} color="red" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-500 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => user ? setIsCheckoutOpen(true) : alert('Please log in to checkout')}
                  className="w-full mt-6 bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default Cart;
