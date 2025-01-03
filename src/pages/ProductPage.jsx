import React from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../components/Cards';
import productsData from '/public/data/db.json';


const ProductPage = () => {
  const { category } = useParams(); // Captura el parámetro de categoría de la URL

  // Filtra los productos según la categoría obtenida del parámetro
  const filteredProducts = productsData.products.filter((product) => product.category === category);


  return (
    <>
      
    <div>
        {filteredProducts.length > 0 ? (
          <Cards products={filteredProducts} />
        ) : (
          <p className="text-gray-500 text-lg font-semibold text-center mt-6">No se encontraron productos.</p>
        )}
    </div>
</>
  );
};

export default ProductPage;

