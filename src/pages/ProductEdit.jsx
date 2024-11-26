import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import axios from 'axios';

const ProductEdit = () => {
  const [products, setProducts] = useState([]);
  const [editableProductId, setEditableProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    images: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado. Por favor, inicia sesión.");
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get("http://localhost:8080/products", config);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error al cargar los productos.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditableProductId(product.id);
    setEditedProduct({
      id: product.id,
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      stock: product.stock || 0,
      category: product.category || '',
      isFeatured: product.isFeatured || false,
      images: product.images || '',
    });
  };

  const handleSaveClick = async () => {
    if (!editedProduct.id) {
      setError("El producto seleccionado no tiene un ID válido.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const productData = { ...editedProduct, orderDetails: editedProduct.orderDetails || [] };
      await axios.put(`http://localhost:8080/products/${editedProduct.id}`, productData, config);
      setSuccess("Producto actualizado exitosamente.");
      setEditableProductId(null);

      // Refrescar la lista de productos
      const updatedProducts = products.map((product) =>
        product.id === editedProduct.id ? { ...product, ...editedProduct } : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error guardando el producto:", error.response?.data || error.message);
      setError("Error al guardar los cambios.");
    }
  };

  const handleDeleteClick = async (productId) => {
    if (!productId || !window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:8080/products/${productId}`, config);
      setProducts(products.filter((p) => p.id !== productId));
      setSuccess("Producto eliminado exitosamente.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error al eliminar el producto.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Validación para evitar valores negativos en precio y stock
    if (name === 'price' || name === 'stock') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue < 0) return; // No permite números negativos
    }

    setEditedProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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
              <td>{product.id}</td>
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedProduct.name || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={editedProduct.description || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="number"
                    name="price"
                    value={editedProduct.price || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="number"
                    name="stock"
                    value={editedProduct.stock || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="text"
                    name="category"
                    value={editedProduct.category || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.category
                )}
              </td>
              <td>
                {editableProductId === product.id ? (
                  <Form.Check
                    type="checkbox"
                    name="isFeatured"
                    checked={!!editedProduct.isFeatured}
                    onChange={() =>
                      setEditedProduct({ ...editedProduct, isFeatured: !editedProduct.isFeatured })
                    }
                  />
                ) : (
                  product.isFeatured ? 'Yes' : 'No'
                )}
              </td>
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="text"
                    name="images"
                    value={editedProduct.images || ''}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    required
                  />
                ) : product.images ? (
                  <img
                    src={product.images}
                    alt={product.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                    }}
                  />
                ) : (
                  'No image'
                )}
              </td>
              <td>
                {editableProductId === product.id ? (
                  <Button
                    variant="success"
                    onClick={handleSaveClick}
                    style={{
                      width: '100px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FaSave className="me-2" /> Save
                  </Button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(product)}
                      style={{
                        width: '100px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FaEdit className="me-2" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(product.id)}
                      style={{
                        width: '100px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FaTrash className="me-2" /> Delete
                  </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductEdit;

