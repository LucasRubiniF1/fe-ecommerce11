import React, { useState } from "react";

const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500">Color: {product.color}</p>
          <button className="text-red-500 text-sm mt-2">Remove</button>
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="bg-gray-200 px-2 py-1 text-lg"
          onClick={decrement}
        >
          -
        </button>
        <span className="mx-4">{quantity}</span>
        <button
          className="bg-gray-200 px-2 py-1 text-lg"
          onClick={increment}
        >
          +
        </button>
      </div>

      <p className="text-lg">${(product.price * quantity).toFixed(2)}</p>
    </div>
  );
};

export default CartItem;
