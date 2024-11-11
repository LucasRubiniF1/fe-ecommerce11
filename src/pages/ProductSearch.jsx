import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cards from '../components/Cards';
import axios from 'axios';

const ProductSearch = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Extrae el término de búsqueda de los parámetros de URL
  const searchTerm = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then((response) => {
        const data = response.data; 
        const filtered = data.filter(product =>
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProducts(filtered);
      })
      .catch((error) => {
        console.error('Error al traer los productos:', error);
      });
  }, [searchTerm]);
  return(
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
}

export default ProductSearch;
