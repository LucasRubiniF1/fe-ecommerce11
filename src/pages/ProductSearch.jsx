import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../components/Cards';
import Navbar from '../components/Navbar';

const ProductSearch = () => {
  const location = useLocation();
  const { filteredProducts } = location.state || { filteredProducts: [] };
  return(
    <>
      
      <div>
          <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda</h2>
          {filteredProducts.length > 0 ? (
            <Cards products={filteredProducts} />
          ) : (
            <p>No se encontraron productos.</p>
          )}
      </div>
  </>
  );
}

export default ProductSearch;
