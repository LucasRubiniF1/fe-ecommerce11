// src/components/ProductForm.jsx
import React from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';

const ProductForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <Container className="my-5" style={{ maxWidth: '600px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1428A0', textAlign: 'center', marginBottom: '30px' }}>Create New Product</h1>

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

        <Form.Group className="mb-3" controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter product stock"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Celulares">Celulares</option>
            <option value="Computadora">Computadoras</option>
            <option value="Televisores">Televisores</option>
            <option value="Audio y Video">Video y Audio</option>
            <option value="Camaras y accesorios">Camaras y accesorios</option>
          </Form.Select>
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

export default ProductForm;
