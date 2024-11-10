import React from 'react';
import { useParams } from 'react-router-dom';
import Cards from '../components/Cards'

const ProductPage = () => {
  const { category } = useParams(); 
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
