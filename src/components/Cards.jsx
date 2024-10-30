import React from 'react';

const Cards = ({products}) => {

  return (
    <div>
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.product_id} 
              className="border rounded-lg p-4 shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              <img
                src={product.images || 'https://via.placeholder.com/150'}
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
      </div>
    </div>
  );
};

export default Cards;
