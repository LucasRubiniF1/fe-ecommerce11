import React from 'react';
import useStore from "../hooks/store.js";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              <div>
                <h2>{item.name}</h2>
                <p>${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, +e.target.value)}
                  className="border w-12"
                />
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
          <h2>Total: ${total.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
};

export default Cart;
