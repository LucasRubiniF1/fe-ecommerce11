import { useState } from 'react';

export default function PaymentForm({ onSubmit, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      onSubmit({ paymentMethod });
    } else {
      alert('Please select a payment method');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      
      <div className="mb-4">
        <label className="flex items-center mb-2">
          <input 
            type="radio" 
            name="paymentMethod" 
            value="Credit Card" 
            onChange={() => setPaymentMethod('Credit Card')}
            className="mr-2" 
          />
          Credit Card
        </label>
        <label className="flex items-center">
          <input 
            type="radio" 
            name="paymentMethod" 
            value="PayPal" 
            onChange={() => setPaymentMethod('PayPal')}
            className="mr-2" 
          />
          PayPal
        </label>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Back
        </button>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
