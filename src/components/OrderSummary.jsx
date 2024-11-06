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
        className="w-full py-3  bg-sky-600  text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
      >
        Confirm Order
      </button>
    </div>
  );
}
