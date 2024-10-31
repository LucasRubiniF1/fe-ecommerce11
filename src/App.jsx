import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductSearch from "./pages/ProductSearch";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
<Router>
      {/* Aplica un contenedor máximo y centra el contenido */}
      <div className="flex flex-col min-h-screen">
      
        <Navbar />    

        {/* Contenedor principal con padding y background */}
        <main className="flex-grow bg-gray-100 p-4">
          <Routes>
            <Route path="/productSearch" element={<ProductSearch />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="/product/create" element={<ProductCreate />} />
            <Route path="/account" element={<Account />} />
            <Route path="/edit-account" element={<EditAccount />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout/:userId" element={<Checkout />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
