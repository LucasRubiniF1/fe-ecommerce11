import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProductSearch from "./pages/ProductSearch";
import ProductDetail from "./pages/ProductDetail"; // Asegúrate de que esta línea no se repita
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import Home from './pages/Home'; 
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        
        <div className="main-content">
          
          <div className="page-content">
            <Routes>
              <Route path="/productSearch" element={<ProductSearch />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/product/edit/:id" element={<ProductEdit />} />
              <Route path="/product/create" element={<ProductCreate />} />
              <Route path="/account" element={<Account />} />
              <Route path="/edit-account" element={<EditAccount />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
        
      </div>
    </Router>
  );
};

export default App;
