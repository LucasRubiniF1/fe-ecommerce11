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
        className="w-full py-3  bg-sky-600  text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}
