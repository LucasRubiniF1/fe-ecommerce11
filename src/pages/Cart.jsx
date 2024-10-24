import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Cart = () => {

  const { userId } = useParams();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error('Error cargando el carrito:', err));
  }, [userId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Cart</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-semibold">Shopping cart</h2>
            <p>Order complete</p>
          </div>
          <div className="border-b border-gray-300 mb-4"></div>

          {/* Si hay productos los mostramos */}
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>

        <CartSummary products={cart} />
      </div>
    </div>
  );
};

export default Cart;
