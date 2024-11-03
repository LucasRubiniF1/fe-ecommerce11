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
    image: '', // Agregado para almacenar la URL de la imagen
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
        isFeatured: product.isFeatured || false,
        image: product.image || '', // Asegurarse de que se cargue la URL de la imagen si existe
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
    setSuccess(true); // Mostrar mensaje de éxito al guardar
    setTimeout(() => setSuccess(false), 3000); // Ocultar mensaje después de 3 segundos
  };

  return (
    <Container className="my-5 d-flex justify-content-center" style={{ maxWidth: '600px' }}>
      <Row className="w-100">
        <Col>
          <h1 style={{ color: '#1428A0', textAlign: 'center', marginBottom: '30px' }}>Product Create</h1>
          
          {success && <Alert variant="success">Product saved successfully!</Alert>}

          <Form onSubmit={handleSubmit} style={{ padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
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
                placeholder="Enter stock quantity"
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter product category"
                required
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                required
              />
            </Form.Group>

            <Form.Group controlId="formIsFeatured" className="mb-3">
              <Form.Check
                type="checkbox"
                name="isFeatured"
                label="Featured"
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
                Save Product
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
