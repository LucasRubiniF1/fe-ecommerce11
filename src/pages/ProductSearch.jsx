import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching products from local JSON file...');
    fetch('/data/products.json')  // Ruta al archivo JSON en tu proyecto
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        console.log('Products fetched:', data);  // Verificar los datos en la consola
        setProducts(data);
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
    return <p>No products available</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;