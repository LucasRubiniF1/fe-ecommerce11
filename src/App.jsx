import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ProductSearch from "./pages/ProductSearch";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import NavbarAdm from "./components/NavbarAdm";
import Footer from "./components/Footer";
import HomeAdm from "./pages/HomeAdm";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      
      {/* Selección de Navbar según la ruta */}
      {location.pathname === '/homeAdmin' ? <NavbarAdm /> : <Navbar />}

      {/* Contenedor principal */}
      <main className="bg-gray-100">
        <Routes>
          <Route path="/productSearch" element={<ProductSearch />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/edit" element={<ProductEdit />} />
          <Route path="/product/create" element={<ProductCreate />} />
          <Route path="/account" element={<Account />} />
          <Route path="/edit-account" element={<EditAccount />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout/:userId" element={<Checkout />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/homeAdmin" element={<HomeAdm />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
