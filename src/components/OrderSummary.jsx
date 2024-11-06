export default function OrderSummary({ shippingData, paymentData, onConfirm }) {
  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Shipping Information</h3>
        <p>{shippingData.name}</p>
        <p>{shippingData.address}</p>
        <p>{shippingData.city}, {shippingData.state} {shippingData.zip}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-lg">Payment Method</h3>
        <p>{paymentData.paymentMethod}</p>
      </div>

      <button
        onClick={onConfirm}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Confirm Order
      </button>
    </div>
  );
}
