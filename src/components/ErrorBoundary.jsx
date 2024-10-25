import React from 'react';
import PropTypes from 'prop-types';
import ErrorAlert from './ErrorAlert'; // Asegúrate de importar tu componente de ErrorAlert

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para mostrar la interfaz de reserva
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de reporte de errores
    console.error("Error capturado en ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Muestra el mensaje de error si hay un error
      return <ErrorAlert message={this.state.errorMessage} />;
    }

    return this.props.children; 
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
