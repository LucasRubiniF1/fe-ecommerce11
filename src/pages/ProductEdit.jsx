import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from "../utils";

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
  const [loading, setLoading] = useState(true); // Estado para el spinner de carga

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtener el token del localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token no encontrado. Por favor, inicia sesión.");
        }

        // Configurar el header con el token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Llamar al endpoint del backend para obtener productos
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
    setEditableProductId(product.id); // Usa 'id' para activar el modo edición
    setEditedProduct({
      id: product.id,
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock: product.stock || '',
      category: product.category || '',
      isFeatured: product.isFeatured || false,
      images: product.images || '',
    });
  };
  


  const handleSaveClick = async () => {
    console.log("Producto editado antes de guardar:", editedProduct);
  
    if (!editedProduct.id) {
      console.error("Error: El ID del producto está indefinido.");
      setError("El producto seleccionado no tiene un ID válido.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Asegúrate de que orderDetails esté definido como un array vacío
      const productData = {
        ...editedProduct,
        orderDetails: editedProduct.orderDetails || [], // Envía un array vacío si no está definido
      };
  
      // Realiza la solicitud PUT
      await axios.put(`http://localhost:8080/products/${editedProduct.id}`, productData, config);
      setSuccess("Producto actualizado exitosamente.");
      setEditableProductId(null); // Salir del modo de edición
    } catch (error) {
      console.error("Error guardando el producto:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error al guardar los cambios.");
    }
  };
  
  


  const handleDeleteClick = async (productId) => {
    console.log("ID recibido para eliminar:", productId); // Verifica qué ID estás recibiendo
    if (!productId) {
      setError("ID del producto no válido.");
      return;
    }

    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(`Intentando eliminar: http://localhost:8080/products/${productId}`); // Verifica la URL generada

      await axios.delete(`http://localhost:8080/products/${productId}`, config);

      setProducts(products.filter((p) => p.product_id !== productId));
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
              {/* Columna ID */}
              <td>{product.id}</td>

              {/* Columna Name */}
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedProduct.name || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  product.name
                )}
              </td>

              {/* Columna Description */}
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

              {/* Columna Price */}
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="number"
                    name="price"
                    value={editedProduct.price || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>

              {/* Columna Stock */}
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="number"
                    name="stock"
                    value={editedProduct.stock || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  product.stock
                )}
              </td>

              {/* Columna Category */}
              <td>
                {editableProductId === product.id ? (
                  <Form.Control
                    type="text"
                    name="category"
                    value={editedProduct.category || ''}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  product.category
                )}
              </td>

              {/* Columna Featured */}
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

              {/* Columna Image */}
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
                  <img src={product.images} alt={product.name} style={{ width: '50px' }} />
                ) : (
                  'No image'
                )}
              </td>

              {/* Columna Actions */}
              <td>
                {editableProductId === product.id ? (
                  // Mostrar el botón "Save" cuando el producto está en modo de edición
                  <Button
                    variant="success"
                    onClick={handleSaveClick}
                    style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <FaSave className="me-2" /> Save
                  </Button>
                ) : (
                  // Mostrar botones "Edit" y "Delete" cuando no está en modo de edición
                  <div className="d-flex">
                    {/* Botón Edit */}
                    <Button
                      variant="warning"
                      onClick={() => handleEditClick(product)}
                      style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FaEdit className="me-2" /> Edit
                    </Button>

                    {/* Espaciador */}
                    <div style={{ width: '10px' }}></div>

                    {/* Botón Delete */}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(product.id)}
                      style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
