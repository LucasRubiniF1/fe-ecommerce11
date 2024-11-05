import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from "../utils";

const ProductEdit = () => {
  const [products, setProducts] = useState([]);
  const [editableProductId, setEditableProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Cargar los productos al montar el componente
    axios.get(`${API_URL}/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("Error al cargar los productos.");
      });
  }, []);

  const handleEditClick = (product) => {
    setEditableProductId(product.product_id);
    setEditedProduct(product);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`${API_URL}/products/${editedProduct.product_id}`, editedProduct);
      setProducts(products.map(p => p.product_id === editedProduct.product_id ? editedProduct : p));
      setEditableProductId(null);
      setSuccess("Producto actualizado exitosamente.");
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Error al guardar los cambios.");
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      setProducts(products.filter(p => p.product_id !== productId));
      setSuccess("Producto eliminado exitosamente.");
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error al eliminar el producto.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <h1>Manage Products</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>
                {editableProductId === product.product_id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editableProductId === product.product_id ? (
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={editedProduct.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editableProductId === product.product_id ? (
                  <Form.Control
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleInputChange}
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td>
                {editableProductId === product.product_id ? (
                  <Form.Control
                    type="number"
                    name="stock"
                    value={editedProduct.stock}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editableProductId === product.product_id ? (
                  <Form.Control
                    type="text"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editableProductId === product.product_id ? (
                  <Form.Check
                    type="checkbox"
                    name="isFeatured"
                    checked={editedProduct.isFeatured}
                    onChange={() => setEditedProduct({ ...editedProduct, isFeatured: !editedProduct.isFeatured })}
                  />
                ) : (
                  product.isFeatured ? 'Yes' : 'No'
                )}
              </td>
              <td>
                {editableProductId === product.product_id ? (
                  <Button variant="success" onClick={handleSaveClick}>
                    <FaSave /> Save
                  </Button>
                ) : (
                  <Button variant="warning" onClick={() => handleEditClick(product)}>
                    <FaEdit /> Edit
                  </Button>
                )}
                <Button variant="danger" onClick={() => handleDeleteClick(product.product_id)} style={{ marginLeft: '10px' }}>
                  <FaTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductEdit;
