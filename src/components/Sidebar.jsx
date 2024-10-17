import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h3>Categories</h3>
      <ul>
        <li><a href="#">All Products</a></li>
        <li><a href="#">Electronics</a></li>
        <li><a href="#">Clothing</a></li>
        <li><a href="#">Home Goods</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
