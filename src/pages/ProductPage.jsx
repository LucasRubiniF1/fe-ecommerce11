import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '/public/data/products.json';
import Cards from '../components/Cards'

const ProductPage = () => {
  const { category } = useParams(); // Captura el parámetro de categoría de la URL

  // Filtra los productos según la categoría obtenida del parámetro
  const filteredProducts = productsData.products.filter((product) => product.category === category);

  return (
    <div className="flex">
      <Cards products={filteredProducts} />
    </div>
  );
};

export default ProductPage;
