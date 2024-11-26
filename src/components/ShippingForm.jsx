import { useState } from 'react';

export default function ShippingForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    shippingMethod: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Llama a la función de envío del componente padre
  };

  const handleCancel = () => {
    onClose(); // Llama a la función para cerrar el modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Shipping Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Shipping Method
          </label>
          <select
            name="shippingMethod"
            required
            value={formData.shippingMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a method</option>
            <option value="pickup-courier">
              Pick up from the nearest courier branch
            </option>
            <option value="pickup-store">Pick up from the store</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          {/* Continue to Payment */}
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
          >
            Continue to Payment
          </button>
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel} // Llama a onClose
            className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
