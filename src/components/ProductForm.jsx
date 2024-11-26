import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    isFeatured: false,
    images: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
        isFeatured: product.isFeatured || false,
        images: product.images || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'price' || name === 'stock') {
      if (value < 0) {
        setError(`${name === 'price' ? 'El precio' : 'El stock'} no puede ser negativo.`);
        return; // Detener el cambio si el valor es negativo
      } else {
        setError(null); // Limpiar error si el valor es válido
      }
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones adicionales antes de enviar
    if (formData.price < 0) {
      setError('El precio no puede ser negativo.');
      return;
    }
    if (formData.stock < 0) {
      setError('El stock no puede ser negativo.');
      return;
    }

    setError(null);
    onSubmit(formData);
    setSuccess(true); // Mostrar mensaje de éxito al guardar
    setTimeout(() => setSuccess(false), 3000); // Ocultar mensaje después de 3 segundos
  };

  return (
    <Container className="my-5 d-flex justify-content-center" style={{ maxWidth: '600px' }}>
      <Row className="w-100">
        <Col>
          <h1 style={{ color: '#1428A0', textAlign: 'center', marginBottom: '30px' }}>Product Create</h1>

          {success && <Alert variant="success">¡Producto guardado con éxito!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} style={{ padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingrese el nombre del producto"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ingrese la descripción del producto"
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ingrese el precio del producto"
                required
              />
            </Form.Group>

            <Form.Group controlId="formStock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Ingrese la cantidad en stock"
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Ingrese la categoría del producto"
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                name="images"
                value={formData.images}
                onChange={handleChange}
                placeholder="Ingrese la URL de la imagen"
                required
              />
            </Form.Group>

            <Form.Group controlId="formIsFeatured" className="mb-3">
              <Form.Check
                type="checkbox"
                name="isFeatured"
                label="Destacado"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: '#1428A0',
                  borderColor: '#1428A0',
                  borderRadius: '50px',
                  padding: '10px 30px',
                  fontSize: '16px',
                }}
              >
                Guardar Producto
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

ProductForm.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
