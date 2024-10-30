import React, { useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import products from '/public/products.json';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductPage = () => {

  return (
    <>
    <Navbar />
    <div className="flex">
      <ProductGrid products={products} />
    </div>
    <Footer/>
    </>
  );
};

export default ProductPage;
