import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../utils";
import { Alert, Button, Container, Row, Col } from 'react-bootstrap'; // Importamos componentes de Bootstrap

const ProductCreate = () => {
  const [showSuccess, setShowSuccess] = useState(false); // Estado para mostrar éxito
  const [showError, setShowError] = useState(false);     // Estado para mostrar error
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await axios.post(`${API_URL}/data/products`, formData); // Enviar datos del producto
      setShowSuccess(true);  // Mostrar alerta de éxito
      setTimeout(() => navigate('/'), 2000); // Redirigir después de 2 segundos
    } catch (error) {
      setShowError(true);    // Mostrar alerta de error
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Create New Product</h1>

          {/* Alerta de éxito */}
          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Product created successfully! Redirecting...
            </Alert>
          )}

          {/* Alerta de error */}
          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              There was an error creating the product. Please try again.
            </Alert>
          )}

          {/* Formulario para crear producto */}
          <ProductForm onSubmit={handleSubmit} />

          <div className="text-center mt-4">
            <Button variant="secondary" onClick={() => navigate('/')}>Go Back</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCreate;
