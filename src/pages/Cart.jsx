import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Cart = () => {
  const { userId } = useParams(); // Obtiene el userId desde la URL
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para mostrar loading

  useEffect(() => {
    // Hacemos fetch al archivo db.json en la carpeta public
    fetch('/data/db.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('Datos del JSON:', data); // Verifica si los datos se están cargando bien

        // Buscamos el usuario que coincide con el userId
        const user = data.users.find(user => user.user_id === parseInt(userId, 10));
        
        if (user) {
          console.log('Usuario encontrado:', user);
          
          if (user.cart && user.cart.items.length > 0) {
            const cartItems = user.cart.items.map(cartItem => {
              // Buscar el producto en la lista de productos por product_id
              const product = data.products.find(p => p.product_id === cartItem.product_id);
              return {
                ...product,
                quantity: cartItem.quantity
              };
            });

            // Guardamos los productos del carrito en el estado
            setCart(cartItems);
          } else {
            console.warn('El carrito del usuario está vacío.');
            setCart([]); // Si no hay carrito, vaciamos el estado
          }
        } else {
          console.error('Usuario no encontrado');
        }
        setIsLoading(false); // Finaliza el loading
      })
      .catch((err) => {
        console.error('Error cargando el carrito:', err);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) {
    return <p>Loading...</p>; // Mostrar loading mientras cargamos los datos
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

          {/* Si hay productos los mostramos */}
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem key={product.product_id} product={product} />
            ))
          ) : (
            <p>No products in the cart.</p> // Mensaje si el carrito está vacío
          )}
        </div>

        {/* Resumen del carrito */}
        <CartSummary products={cart} />
        {console.log(cart.reduce((acc, product) => acc + product.price * product.quantity, 0))}
      </div>
    </div>
  );
};

export default Cart;
