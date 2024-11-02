import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Íconos para eliminar y editar
import useFetch from '../hooks/useFetch';
import { API_URL } from "../utils";
import axios from 'axios';

const ProductEdit = () => {
  const navigate = useNavigate();
  const { data: products, loading, error } = useFetch(`${API_URL}/data/products.json`);
  const [editableProducts, setEditableProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la barra de búsqueda

  // Verificar que products no sea null antes de aplicar filter
  const filteredProducts = (products || []).filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (product) => {
    setEditableProducts([...editableProducts, product.product_id]);
  };

  const handleSave = async (product) => {
    try {
      await axios.put(`${API_URL}/data/products/${product.product_id}`, product);
      setEditableProducts(editableProducts.filter(id => id !== product.product_id));
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleInputChange = (e, product, field) => {
    product[field] = e.target.value;
    setEditableProducts([...editableProducts]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/data/products/${id}`);
      navigate(0); 
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Products</h1>

      {/* Barra de búsqueda para filtrar por nombre */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '100%',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Images</th>
            <th>Category</th>
            <th>Stock</th> {/* Nueva columna para Stock */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.product_id}>
              <td>
                {editableProducts.includes(product.product_id) ? (
                  <input 
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange(e, product, 'name')}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editableProducts.includes(product.product_id) ? (
                  <input 
                    type="number"
                    value={product.price}
                    onChange={(e) => handleInputChange(e, product, 'price')}
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editableProducts.includes(product.product_id) ? (
                  <input 
                    type="text"
                    value={product.description}
                    onChange={(e) => handleInputChange(e, product, 'description')}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editableProducts.includes(product.product_id) ? (
                  <input 
                    type="text"
                    value={product.images}
                    onChange={(e) => handleInputChange(e, product, 'images')}
                    placeholder="Image URL"
                  />
                ) : (
                  <img src={product.images} alt={product.name} style={{ width: '50px' }} />
                )}
              </td>
              <td>
                {editableProducts.includes(product.product_id) ? (
                  <input 
                    type="text"
                    value={product.category}
                    onChange={(e) => handleInputChange(e, product, 'category')}
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editableProducts.includes(product.product_id) ? (
                  <input 
                    type="number" // Campo para editar stock
                    value={product.stock}
                    onChange={(e) => handleInputChange(e, product, 'stock')}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editableProducts.includes(product.product_id) ? (
                  <button onClick={() => handleSave(product)}>Save</button>
                ) : (
                  <FaEdit onClick={() => handleEditClick(product)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                )}
                <FaTrash onClick={() => handleDelete(product.product_id)} style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductEdit;
