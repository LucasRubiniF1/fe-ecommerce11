import React from 'react';
import ProductCard from './ProductCard1';

const ProductGrid = ({ products, user }) => {
    return ( 
      <div className="flex items-center justify-between w-full p-4 grid grid-cols-3 gap-6 relative">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };
  

export default ProductGrid;