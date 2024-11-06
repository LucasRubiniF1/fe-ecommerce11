import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import OrderConfirmation from './OrderConfirmation';

import useStore from '../hooks/UseStore';

export default function CheckoutModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const { cart, getCartTotal, clearCart } = useStore();

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setStep(3);
  };

  const handleConfirmOrder = () => {
    // Aquí podrías enviar la orden a tu backend
    const order = {
      items: cart,
      shipping: shippingData,
      payment: paymentData,
      total: getCartTotal(),
      date: new Date().toISOString()
    };
    console.log('Order placed:', order);
    
    setStep(4);
    clearCart();
  };

  const handleClose = () => {
    if (step === 4) {
      setStep(1);
      setShippingData(null);
      setPaymentData(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative"
        >
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-2">
            <div
              className="bg-blue-500 h-full transition-all duration-300 rounded-t-2xl"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Content */}
          <div className="p-6 pt-8">
            {step === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
            {step === 2 && <PaymentForm onSubmit={handlePaymentSubmit} onBack={() => setStep(1)} />}
            {step === 3 && (
              <OrderSummary
                cart={cart}
                shipping={shippingData}
                payment={paymentData}
                onConfirm={handleConfirmOrder}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && <OrderConfirmation onClose={handleClose} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
}