import React, { useState } from 'react';
import { Button, Container, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from "../utils";
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    stock: '', // Añadir stock al estado
    category: '' // Añadir categoría al estado
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
      await axios.post(`${API_URL}/data/products`, formData);
      setSuccess(true);
      navigate('/');
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
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock amount"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
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
