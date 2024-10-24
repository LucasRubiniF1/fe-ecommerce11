// Carousel.jsx
import React, { useState } from 'react';

const Carousel = ({ products }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

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

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Productos Electrónicos</h2>
      <div className="flex items-center">
        <button 
          onClick={prevPage} 
          disabled={startIndex === 0} 
          className="mr-4 p-2 bg-gray-300 rounded-lg"
        >
          ←
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(startIndex, startIndex + itemsPerPage).map((product) => (
            <div 
              key={product.product_id} 
              className="border rounded-lg p-4 shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src={product.images || 'https://www.unidiversidad.com.ar/cache/pc_1000_1100.jpg'}
                alt={product.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-500 font-bold mt-2">${product.price}</p>
              <p className="text-gray-500">Stock: {product.stock}</p>
            </div>
          ))}
        </div>

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

export default Carousel;
