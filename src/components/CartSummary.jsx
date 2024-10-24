import React, { useState } from "react";

const CartSummary = ({ products }) => {
  const [shippingOption, setShippingOption] = useState("free");
  const shippingCost = shippingOption === "express" ? 15.0 : 0.0;
  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const total = (subtotal + shippingCost).toFixed(2);

  return (
    <div className="w-full md:w-1/4 p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Cart summary</h2>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="shipping"
            value="free"
            checked={shippingOption === "free"}
            onChange={() => setShippingOption("free")}
          />
          <span className="ml-2">Free shipping</span>
          <span className="ml-auto">$0.00</span>
        </label>

        <label className="flex items-center mt-2">
          <input
            type="radio"
            name="shipping"
            value="express"
            checked={shippingOption === "express"}
            onChange={() => setShippingOption("express")}
          />
          <span className="ml-2">Express shipping</span>
          <span className="ml-auto">+$15.00</span>
        </label>
      </div>

      <div className="border-t border-gray-300 mt-4 pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-black text-white py-2 rounded">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
