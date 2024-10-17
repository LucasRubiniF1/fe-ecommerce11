import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching products...');  // Añadir log para saber cuándo empieza a cargar
    axios.get('http://localhost:3001/products')
      .then(response => {
        console.log('Products fetched:', response.data);  // Añadir log para verificar los datos
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (!products.length) {
    return <p>No products available</p>;  // Mostrar si no hay productos
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
