import { useState } from 'react';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import OrderConfirmation from './OrderConfirmation';
import { checkoutCart, clearCart } from '../Services/serviceCheckout.js';
import { useAuth } from "../hooks/UseAuth.js"; 

export default function CheckoutModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const { user, cart } = useAuth();
  

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setStep(3);
  };

  const handleConfirmOrder = async () => {
    try {
      // Llama a la función de checkout
      const newOrder = await checkoutCart(user.id);
      setOrder(newOrder);
      setStep(4);  // Avanza al paso de confirmación
      clearCart();
    } catch (err) {
      console.error("Error durante el checkout:", err);
      setError("Hubo un problema con el checkout. Inténtalo de nuevo.");
    }
  };

  const handleClose = () => {
    setStep(1);
    setShippingData(null);
    setPaymentData(null);
    setOrder(null);
    setError(null);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          {step === 1 && (
            <ShippingForm onSubmit={handleShippingSubmit} />
          )}
          {step === 2 && (
            <PaymentForm 
              onSubmit={handlePaymentSubmit} 
              onBack={() => setStep(1)} 
            />
          )}
          {step === 3 && (
            <OrderSummary 
              shippingData={shippingData} 
              paymentData={paymentData} 
              onConfirm={handleConfirmOrder} 
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <OrderConfirmation 
              order={order} 
              onClose={handleClose} 
              error={error} 
            />
          )}
          {error && (
            <div className="text-red-500 mt-4">{error}</div>
          )}
        </div>
      </div>
    )
  );
}
