import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductSearch from "./pages/ProductSearch";
import ProductDetail from "./pages/ProductDetail";
import Account from "./pages/Account";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <div className="page-content">
            <Routes>
              <Route path="/" element={<ProductSearch />} />
              <Route path="/" element={<ProductDetail />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
