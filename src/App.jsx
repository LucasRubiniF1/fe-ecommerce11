import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductSearch from "./pages/ProductSearch";
import ProductDetail from "./pages/ProductDetail";
import ProductEdit from "./pages/ProductEdit";
import ProductCreate from "./pages/ProductCreate";
import Account from "./pages/Account";
import EditAccount from "./pages/EditAccount";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import NavbarAdm from "./components/NavbarAdm";
import Footer from "./components/Footer";
import HomeAdm from "./pages/HomeAdm";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import { AuthProvider } from "./context/AuthContext";
import CheckoutHistory from "./pages/CheckoutHistory";
import RegisterAdmin from "./pages/RegisterAdmin";
import NotFound from "./pages/NotFound";


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Selección de Navbar según la ruta */}
      {/*pathname !== '/login' && (pathname === '/homeAdmin' || pathname ==='/product/create'
      || pathname ==='/product/edit' || pathname ==='/account' ? <NavbarAdm /> : <Navbar />)*/}

      {/* Contenedor principal */}
      <main className="bg-gray-100 flex-grow">
        <Navbar />
        <Routes>
          <Route path="/productSearch" element={<ProductSearch />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/edit" element={<ProductEdit />} />
          <Route path="/product/create" element={<ProductCreate />} />
          <Route path="/checkout-history" element={<CheckoutHistory />} />
          <Route path="/account" element={<Account />} />
          <Route path="/edit-account" element={<EditAccount />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homeAdmin" element={<HomeAdm />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
