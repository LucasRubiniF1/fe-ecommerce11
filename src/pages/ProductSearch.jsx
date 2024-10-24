import React from 'react';
import ProductCard from '../components/ProductCard';
import useFetch from '../hooks/useFetch';
import { API_URL } from '../utils/Utilis';

const ProductSearch = () => {
  const { data: products, loading, error } = useFetch(`${API_URL}/data/products.json`);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error fetching products: {error.message}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link to="/product/create">Create New Product</Link>
    </div>
  );
};

export default ProductSearch;
