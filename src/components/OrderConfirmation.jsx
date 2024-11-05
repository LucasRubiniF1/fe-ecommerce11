import { FaCheckCircle } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function OrderConfirmation({ onClose }) {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-4">
        <FaCheckCircle className="text-green-500 text-6xl" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Order Confirmed!
      </h2>
      
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. We'll send you a confirmation email shortly.
      </p>
      
      <button
        onClick={onClose}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}