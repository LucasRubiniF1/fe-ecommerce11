import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#343a40",
        padding: "10px 20px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>My eCommerce</h1>
      <ul
        style={{ listStyle: "none", display: "flex", gap: "20px", margin: 0 }}
      >
        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" style={{ color: "#fff", textDecoration: "none" }}>
            Shop
          </Link>
        </li>
        <li>
          <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/account" style={{ color: "#fff", textDecoration: "none" }}>
            My Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
