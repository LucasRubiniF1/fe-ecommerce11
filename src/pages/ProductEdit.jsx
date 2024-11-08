// src/pages/ProductEdit.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from "../utils";

const ProductEdit = () => {
  const [products, setProducts] = useState([]);
  const [editableProductId, setEditableProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para el spinner de carga

  useEffect(() => {
    // Cargar todos los productos al montar el componente
    axios.get(`${API_URL}/products`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("Error al cargar los productos.");
        setLoading(false);
      });
  }, []);

  const handleEditClick = (product) => {
    setEditableProductId(product.product_id);
    setEditedProduct(product);
    setError(null); // Limpiar cualquier error anterior
    setSuccess(null); // Limpiar cualquier mensaje de éxito anterior
  };

  const handleSaveClick = async () => {
    if (!editedProduct.name || !editedProduct.price || !editedProduct.stock || !editedProduct.category) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      await axios.put(`${API_URL}/products/${editedProduct.product_id}`, editedProduct);
      setProducts(products.map(p => p.product_id === editedProduct.product_id ? editedProduct : p));
      setEditableProductId(null);
      setSuccess("Producto actualizado exitosamente.");
      setTimeout(() => setSuccess(null), 3000); // Ocultar mensaje de éxito
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Error al guardar los cambios.");
      setTimeout(() => setError(null), 3000); // Ocultar mensaje de error
    }
  };

  const handleDeleteClick = async (productId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
      setProducts(products.filter(p => p.product_id !== productId));
      setSuccess("Producto eliminado exitosamente.");
      setTimeout(() => setSuccess(null), 3000); // Ocultar mensaje de éxito
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error al eliminar el producto.");
      setTimeout(() => setError(null), 3000); // Ocultar mensaje de error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  // Mostrar un spinner mientras se cargan los productos
  if (loading) {
    return (
      <Container style={{ marginTop: '20px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

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
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.product_id}</td>
              <td>
                {editableProductId === product.product_id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                    required
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
                    required
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
                    required
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
                    required
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
                  <Form.Control
                    type="text"
                    name="images"
                    value={editedProduct.images}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                  />
                ) : (
                  product.images ? <img src={product.images} alt={product.name} style={{ width: '50px' }} /> : 'No image'
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
