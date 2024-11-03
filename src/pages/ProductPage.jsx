import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import products from '/public/data/products.json';


const ProductPage = () => {

  return (
    <div className="flex">
      <ProductGrid products={products} />
    </div>
    
  );
};

export default ProductPage;
