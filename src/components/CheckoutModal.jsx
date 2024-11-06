import { useState } from 'react';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import OrderConfirmation from './OrderConfirmation';

export default function CheckoutModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setShippingData(null);
    setPaymentData(null);
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
              onConfirm={() => setStep(4)} 
            />
          )}
          {step === 4 && (
            <OrderConfirmation onClose={handleClose} />
          )}
        </div>
      </div>
    )
  );
}
