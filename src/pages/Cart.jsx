import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'
import { useState, useEffect } from "react";

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/data/products.json') // Cambia esta ruta al archivo JSON real
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Cart</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <div className="mb-4 flex justify-between">
            <h2 className="text-xl font-semibold">Shopping cart</h2>
            <p>Checkout details</p>
            <p>Order complete</p>
          </div>
          <div className="border-b border-gray-300 mb-4"></div>

          {/* Si hay productos los mostramos */}
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>

        <CartSummary products={products} />
      </div>
    </div>
  );
};

export default Cart;
