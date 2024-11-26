import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/UseAuth.js";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import useStore from "../hooks/UseStore.js";
import axios from "axios";

const Wishlist = () => {
  const { user } = useAuth(); // Información del usuario logueado
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [error, setError] = useState(null);
  const { removeFromWishlist } = useStore(); // Importa la función desde el store
  const navigate = useNavigate();

  // Solicitar la wishlist al backend
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!user || !user.id) {
        setError("Usuario no autenticado");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado. Por favor, inicia sesión.");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/wishlist/get?userId=${user.id}`,
          config
        );

        const products = response.data.map((item) => item.product);
        setWishlistProducts(products);
      } catch (err) {
        console.error("Error al obtener la wishlist:", err);
        setError("No se pudo cargar tu lista de deseos. Por favor, inténtalo más tarde.");
      }
    };

    fetchWishlistProducts();
  }, [user]);

  // Manejar clic para eliminar producto de la wishlist
  const handleRemoveFromWishlist = async (productId) => {
    if (!user || !user.id || !productId) {
      console.error("Datos insuficientes para eliminar de la wishlist.");
      return;
    }

    try {
      await removeFromWishlist(productId, user.id);
      setWishlistProducts((prev) =>
        prev.filter((product) => product.id !== productId)
      );
    } catch (err) {
      console.error("Error al eliminar el producto de la wishlist:", err);
    }
  };

  // Redirigir a la página principal si la wishlist está vacía
  const handleRedirectToHome = () => {
    navigate("/");
  };

  if (wishlistProducts.length === 0 && !error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ¡Ups...no tienes productos en tu lista de favoritos!
        </h2>
        <p className="text-gray-500 mb-6">
          Explora nuestros productos y agrega tus favoritos para encontrarlos fácilmente más tarde.
        </p>
        <button
          onClick={handleRedirectToHome}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-lime-900 mb-6">Tu Wishlist</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="group relative border-0 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 bg-white overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-gray-50 px-3 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-600">Stock: {product.stock}</p>
            </div>

            <div
              className="relative mb-6 rounded-xl bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`, { state: product })}
            >
              <img
                src={product.images || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-48 object-contain mix-blend-multiply"
              />
            </div>

            <div className="space-y-2 cursor-pointer" onClick={() => navigate(`/product/${product.id}`, { state: product })}>
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="p-3 rounded-xl border text-gray-600 border-gray-200 hover:text-red-500 hover:border-red-500 transition-colors duration-300"
              >
                <FaTrash size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
