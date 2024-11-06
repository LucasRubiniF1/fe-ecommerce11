import { FaArrowLeft } from 'react-icons/fa';
import useStore from '../hooks/UseStore';

export default function OrderSummary({ shippingData, paymentData, onConfirm, onBack }) {
  const { cart } = useStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
      {/* Información de Envío */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Shipping Information</h3>
        <p>{shippingData.name}</p>
        <p>{shippingData.address}</p>
        <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
      </div>

      {/* Método de Pago */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Payment Method</h3>
        <p>{paymentData.paymentMethod}</p>
      </div>

      {/* Total del Carrito */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Total</h3>
        <p>${total.toFixed(2)}</p>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <FaArrowLeft />
          Back
        </button>

        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
