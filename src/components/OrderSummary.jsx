export default function OrderSummary({ shippingData, paymentData, onConfirm }) {
  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {/* Shipping Information */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Shipping Method</h3>
        <p>{shippingData.shippingMethod === 'pickup-courier' ? 'Pick up from the nearest courier branch' : 'Pick up from the store'}</p>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Payment Method</h3>
        <p>{paymentData.paymentMethod}</p>
      </div>

      {/* Confirm Order Button */}
      <button
        onClick={onConfirm}
        className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
      >
        Confirm Order
      </button>
    </div>
  );
}
