import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Cart = () => {
  const { userId } = useParams();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/db.json')
      .then((res) => res.json())
      .then((data) => {
        const user = data.users.find(user => user.user_id === parseInt(userId, 10));
        if (user) {
          if (user.cart && user.cart.items.length > 0) {
            const cartItems = user.cart.items.map(cartItem => {
              const product = data.products.find(p => p.product_id === cartItem.product_id);
              return {
                ...product,
                quantity: cartItem.quantity
              };
            });
            setCart(cartItems);
          } else {
            setCart([]);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error cargando el carrito:', err);
        setIsLoading(false);
      });
  }, [userId]);

  // Función para actualizar la cantidad de un producto en el carrito
  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(product =>
        product.product_id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Cart</h1>
      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-3/4">
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-semibold">Shopping cart</h2>
            <p>Order complete</p>
          </div>
          <div className="border-b border-gray-300 mb-4"></div>
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem 
                key={product.product_id} 
                product={product} 
                updateQuantity={updateCartItemQuantity} // Pasamos la función aquí
              />
            ))
          ) : (
            <p>No products in the cart.</p>
          )}
        </div>
        <CartSummary products={cart} />
      </div>
    </div>
  );
};

export default Cart;
