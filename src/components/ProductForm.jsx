import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        isFeatured: product.is_featured,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <label>
        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
        Featured
      </label>
      <button type="submit">Save Product</button>
    </form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
