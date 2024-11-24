import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarouselAdm = ({ products, titulo }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  // Pagination controls
  const nextPage = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  const decodeBase64Image = (base64String) => {
    try {
      return atob(base64String); // Decodifica el Base64
    } catch (error) {
      console.error("Error al decodificar la imagen:", error);
      return ''; // Devuelve una cadena vacía si falla
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-lime-900 mb-6">{titulo}</h2>
      <div className="flex items-center">
        {/* Botón Anterior */}
        <button
          onClick={prevPage}
          disabled={startIndex === 0}
          className="mr-4 p-2 bg-gray-300 rounded-lg"
        >
          ←
        </button>

        {/* Contenedor de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(startIndex, startIndex + itemsPerPage).map((product) => (
            <div
              key={product.id || product.product_id} // Asegúrate de manejar ambos casos
              className="group relative border-0 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 bg-white overflow-hidden"
            >
              {/* Imagen del Producto */}
              <div
                className="relative mb-6 rounded-xl bg-gray-50 p-4 transition-transform duration-300 group-hover:scale-[1.02] cursor-pointer"
                onClick={() => handleClick(product)}
              >
                <img
                  src={
                    product.images
                      ? decodeBase64Image(product.images)
                      : 'https://via.placeholder.com/150'
                  }
                  alt={product.name || 'Producto'}
                  className="w-full h-48 object-contain mix-blend-multiply"
                />
              </div>

              {/* Información del Producto */}
              <div
                className="space-y-2 cursor-pointer"
                onClick={() => handleClick(product)}
              >
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.name || 'Sin nombre'}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem]">
                  {product.description || 'Sin descripción'}
                </p>
                <p className="text-sm font-bold text-gray-500">
                  Stock: {product.stock || 0}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${product.price || '0.00'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={nextPage}
          disabled={startIndex + itemsPerPage >= products.length}
          className="ml-4 p-2 bg-gray-300 rounded-lg"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default CarouselAdm;
