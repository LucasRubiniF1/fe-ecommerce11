import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/UseAuth.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const { user } = useAuth(); // Información del usuario logueado
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Solicitar la wishlist al backend
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!user || !user.id) {
        setError("Usuario no autenticado");
        return;
      }

      try {
        // Obtener el token desde el localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado. Por favor, inicia sesión.");
        }

        // Configurar la cabecera con el token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Llamar al backend para obtener la wishlist del usuario logueado
        const response = await axios.get(
          `http://localhost:8080/wishlist/get?userId=${user.id}`,
          config
        );

        // Extraer los datos del producto dentro de cada entrada del array
        const products = response.data.map((item) => item.product);

        // Actualizar el estado con los productos extraídos
        setWishlistProducts(products);
      } catch (err) {
        console.error("Error al obtener la wishlist:", err);
        setError(
          "No se pudo cargar tu lista de deseos. Por favor, inténtalo más tarde."
        );
      }
    };

    fetchWishlistProducts();
  }, [user]);

  // Manejar clic en un producto
  const handleClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  // Manejar redirección a la página de inicio si la wishlist está vacía
  const handleRedirectToHome = () => {
    navigate("/");
  };

  // Manejar agregar al carrito
  const handleAddToCart = (product) => {
    navigate("/cart", { state: product });
  };

  if (wishlistProducts.length === 0 && !error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ¡Ups...no tienes productos en tu lista de favoritos!
        </h2>
        <p className="text-gray-500 mb-6">
          Explora nuestros productos y agrega tus favoritos para encontrarlos
          fácilmente más tarde.
        </p>
        <button
          onClick={handleRedirectToHome}
          className="px-6 py-3 bg-blue-600 text-blue rounded-lg hover:bg-blue-700 transition-all"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-lime-900 mb-6">Tu Wishlist</h2>

      {/* Mostrar mensaje de error si ocurre */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Mostrar productos de la wishlist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="group relative border-0 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 bg-white overflow-hidden"
          >
            {/* Badge de stock */}
            <div className="absolute top-4 right-4 bg-gray-50 px-3 py-1 rounded-full">
              <p className="text-xs font-medium text-gray-600">Stock: {product.stock}</p>
            </div>

            {/* Contenedor de imagen con efecto hover */}
            <div
              className="relative mb-6 rounded-xl bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
              onClick={() => handleClick(product)}
            >
              <img
                src={
                  product.images
                    ? atob(product.images) // Decodificar el base64 de la URL de la imagen
                    : "https://via.placeholder.com/150" // Imagen de respaldo
                }
                alt={product.name}
                className="w-full h-48 object-contain mix-blend-multiply"
              />
            </div>

            {/* Contenido del producto */}
            <div
              className="space-y-2 cursor-pointer"
              onClick={() => handleClick(product)}
            >
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
                {product.description}
              </p>
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <FaShoppingCart size={11} />
                Add to Cart
              </button>
              <button
                onClick={() => navigate(`/wishlist`)}
                className="p-3 rounded-xl border text-red-600 border-red-600 hover:text-red-800 hover:border-red-800 transition-colors duration-300"
              >
                <FaHeart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
