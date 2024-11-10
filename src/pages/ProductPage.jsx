import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import productsData from '/public/data/db.json';


const ProductPage = () => {
  const { category } = useParams(); // Captura el parámetro de categoría de la URL

  // Filtra los productos según la categoría obtenida del parámetro
  const filteredProducts = productsData.products.filter((product) => product.category === category);


  return (
    <div className="flex">
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default ProductPage;

