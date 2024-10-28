import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = ({ message }) => {
  return (
    <div style={{ color: 'red' }}>
      <strong>Error: {message}</strong>
    </div>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;
