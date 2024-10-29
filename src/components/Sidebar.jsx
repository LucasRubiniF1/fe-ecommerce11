import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTv, FaTshirt, FaCouch, FaPlus, FaEdit } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside style={sidebarStyle}>
      <h3 style={headerStyle}>Categories</h3>
      <ul style={listStyle}>
        <li style={itemStyle}>
          <Link to="/" style={linkStyle}><FaHome style={iconStyle} /> All Products</Link>
        </li>
        <li style={itemStyle}>
          <Link to="/electronics" style={linkStyle}><FaTv style={iconStyle} /> Electronics</Link>
        </li>
        <li style={itemStyle}>
          <Link to="/clothing" style={linkStyle}><FaTshirt style={iconStyle} /> Clothing</Link>
        </li>
        <li style={itemStyle}>
          <Link to="/home-goods" style={linkStyle}><FaCouch style={iconStyle} /> Home Goods</Link>
        </li>
      </ul>
      <h3 style={headerStyle}>Product Management</h3>
      <ul style={listStyle}>
        <li style={itemStyle}>
          <Link to="/product/create" style={linkStyle}><FaPlus style={iconStyle} /> Create Product</Link>
        </li>
        <li style={itemStyle}>
          <Link to="/product/manage" style={linkStyle}><FaEdit style={iconStyle} /> Manage Products</Link>
        </li>
      </ul>
    </aside>
  );
};

// Estilos en línea
const sidebarStyle = {
  width: '220px',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  height: '100vh',
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
};

const headerStyle = {
  fontSize: '1.2rem',
  color: '#343a40',
  marginBottom: '10px',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const itemStyle = {
  marginBottom: '10px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#495057',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  marginRight: '8px',
};

export default Sidebar;
