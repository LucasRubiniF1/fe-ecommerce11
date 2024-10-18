import React from "react";
import "./styles/header.css"; // Asegúrate de que la ruta del archivo CSS sea correcta

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>G11Ecommerce.</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#shop">Shop</a>
          </li>
          <li>
            <a href="#product">Product</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="icons">
        <a href="#search">
          <i className="fas fa-search"></i>
        </a>
        <a href="#user">
          <i className="fas fa-user"></i>
        </a>
        <a href="#cart">
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">2</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
