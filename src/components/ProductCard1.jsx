import React from 'react';

const ProductCard1 = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="text-blue-500 text-sm font-semibold mb-2">
        {product.installment}
      </div>
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
      <h2 className="font-semibold">{product.name}</h2>
      <p className="text-gray-500">{product.model}</p>
      <div className="flex items-center gap-2 mt-2">
        {product.colors?.map((color, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full bg-${color}`}
            title={color}
          ></div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        {product.capacities?.map((capacity, index) => (
          <span key={index} className="text-gray-600 border rounded-full px-2 py-1">
            {capacity}
          </span>
        ))}
      </div>
      <div>
      <div className="flex justify-center items-center mt-4">
        <p className="text-2xl text-center text-black">
            {product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
        </p>
    </div>
    </div>
    </div>
  );
};

export default ProductCard1;
