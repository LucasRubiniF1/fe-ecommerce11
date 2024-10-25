import React, { useState } from 'react';
import { Button, Container, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    images: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que la URL sea la correcta para tu servidor JSON
      await axios.post(`http://localhost:3000/public/data/products`, formData);
      setSuccess(true);
      navigate('/'); // Redirige a la página de productos
    } catch (error) {
      setError('Error creating product');
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '600px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1428A0', textAlign: 'center', marginBottom: '30px' }}>Create New Product</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Product created successfully!</Alert>}

      <Form onSubmit={handleSubmit} style={{ padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
        <Form.Group className="mb-3" controlId="formName">
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

        <Form.Group className="mb-3" controlId="formPrice">
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

        <Form.Group className="mb-3" controlId="formDescription">
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

        <Form.Group className="mb-3" controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </Form.Group>

        <Row>
          <Col className="text-center">
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
              Create Product
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ProductCreate;
