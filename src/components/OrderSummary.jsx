import { FaArrowLeft } from 'react-icons/fa';
import useStore from '../hooks/UseStore';

export default function OrderSummary({ shipping, payment, onConfirm, onBack }) {

  const { cart } = useStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);



  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft /> Back to Payment
      </button>

      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-6">
        {/* Items */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Items</h3>
          {cart.map((item) => (
            <div key={item.product_id} className="flex justify-between">
              <span className="text-gray-600">
                {item.name} x {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping */}
        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
          <div className="text-gray-600">
            <p>{shipping.fullName}</p>
            <p>{shipping.address}</p>
            <p>{shipping.city}, {shipping.state} {shipping.zipCode}</p>
            <p>{shipping.phone}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="border-t pt-4">
          <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
          <div className="text-gray-600">
            <p>Card ending in {payment.cardNumber.slice(-4)}</p>
            <p>{payment.cardHolder}</p>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}