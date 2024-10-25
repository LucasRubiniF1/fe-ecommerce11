import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h3>Categories</h3>
      <ul>
        <li><Link to="/">All Products</Link></li>
        <li><Link to="/electronics">Electronics</Link></li>
        <li><Link to="/clothing">Clothing</Link></li>
        <li><Link to="/home-goods">Home Goods</Link></li>
        {/* Enlaces para ABM */}
        <li><Link to="/product/create">Create Product</Link></li>
        <li><Link to="/product/manage">Manage Products</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
