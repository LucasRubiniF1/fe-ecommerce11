import { FaArrowLeft, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { useState } from 'react';

export default function PaymentForm({ onSubmit, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("funciono el fomrulario de pago")
    if (paymentMethod) {
      onSubmit({ paymentMethod });
    } else {
      alert('Por favor selecciona un método de pago');
    }
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft /> Volver a Envío
      </button>

      <h2 className="text-2xl font-bold mb-6">Información de Pago</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-around">
          {/* Opción de Efectivo */}
          <div
            onClick={() => handlePaymentChange('cash')}
            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer shadow-sm transition-colors ${
              paymentMethod === 'cash'
                ? 'bg-sky-100 text-sky-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaMoneyBillWave className="text-3xl mb-2" />
            <span className="font-medium">Efectivo</span>
          </div>

          {/* Opción de Dinero en Cuenta */}
          <div
            onClick={() => handlePaymentChange('debitAccount')}
            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer shadow-sm transition-colors ${
              paymentMethod === 'debitAccount'
                ? 'bg-sky-100 text-sky-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FaCreditCard className="text-3xl mb-2" />
            <span className="font-medium">Cuenta de Débito</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
        >
          Revisar Pedido
        </button>
      </form>
    </div>
  );
}
