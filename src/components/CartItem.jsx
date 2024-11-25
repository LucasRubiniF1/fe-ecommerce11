import React, { useState, useEffect } from "react";

const CartItem = ({ product, updateQuantity }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  // Decodificación de la URL de la imagen
  const decodeImageUrl = (base64String) => {
    try {
      return atob(base64String);
    } catch (error) {
      console.error("Error decoding Base64 string:", error);
      // Imagen por defecto si hay un error en la decodificación
      return 'https://http2.mlstatic.com/D_NQ_NP_2X_977897-MLU79321619721_092024-F.webp';
    }
  };

  useEffect(() => {
    // Notificamos al componente padre cuando la cantidad cambia
    updateQuantity(product.product_id, quantity);
  }, [quantity]); // Se ejecuta cada vez que 'quantity' cambia

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div className="flex justify-between items-center border-b py-4">
      <div className="flex items-center">
        <img
          src={decodeImageUrl(product.images)}
          alt={product.name}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <button className="text-red-500 text-sm mt-2">Remove</button>
        </div>
      </div>

      <div className="flex items-center">
        <button className="bg-gray-200 px-2 py-1 text-lg" onClick={decrement}>-</button>
        <span className="mx-4">{quantity}</span>
        <button className="bg-gray-200 px-2 py-1 text-lg" onClick={increment}>+</button>
      </div>

      <p className="text-lg">${(product.price * quantity).toFixed(2)}</p>
    </div>
  );
};

export default CartItem;
